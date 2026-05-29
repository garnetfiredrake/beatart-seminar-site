import { createSign, randomUUID } from "node:crypto";

const DEFAULT_TOKEN_TTL_SECONDS = 15 * 60;
const MAX_TOKEN_TTL_SECONDS = 60 * 60;
const DEFAULT_HERO_PLAYBACK_ID = "ozBbHDhW6Noi71TFb00tsI7zpdF202dMd4eakM6pA91VQ";

function base64Url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function normalizePrivateKey(rawKey) {
  const key = rawKey.trim().replace(/\\n/g, "\n");

  if (key.includes("-----BEGIN")) {
    return key;
  }

  return Buffer.from(key, "base64").toString("utf8");
}

function getTokenTtlSeconds() {
  const parsed = Number.parseInt(process.env.MUX_HERO_TOKEN_TTL_SECONDS ?? "", 10);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_TOKEN_TTL_SECONDS;
  }

  return Math.min(parsed, MAX_TOKEN_TTL_SECONDS);
}

function signMuxPlaybackToken({ playbackId, expiresAt, sessionId }) {
  const keyId = process.env.MUX_SIGNING_KEY_ID;
  const privateKey = process.env.MUX_SIGNING_PRIVATE_KEY;

  if (!keyId || !privateKey) {
    return null;
  }

  const claims = {
    sub: playbackId,
    aud: "v",
    exp: expiresAt,
    kid: keyId,
    custom: {
      session_id: sessionId,
    },
  };

  if (process.env.MUX_PLAYBACK_RESTRICTION_ID) {
    claims.playback_restriction_id = process.env.MUX_PLAYBACK_RESTRICTION_ID;
  }

  const header = {
    alg: "RS256",
    typ: "JWT",
    kid: keyId,
  };
  const payload = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(claims))}`;
  const signature = createSign("RSA-SHA256")
    .update(payload)
    .end()
    .sign(normalizePrivateKey(privateKey));

  return `${payload}.${base64Url(signature)}`;
}

function getConfiguredPlayback() {
  const signedPlaybackId = process.env.MUX_HERO_SIGNED_PLAYBACK_ID;
  const publicPlaybackId = process.env.MUX_HERO_PLAYBACK_ID;
  const hasSigningCredentials = Boolean(process.env.MUX_SIGNING_KEY_ID && process.env.MUX_SIGNING_PRIVATE_KEY);

  if (publicPlaybackId) {
    return {
      playbackId: publicPlaybackId,
      requiresToken: false,
    };
  }

  if (signedPlaybackId && hasSigningCredentials) {
    return {
      playbackId: signedPlaybackId,
      requiresToken: true,
    };
  }

  if (signedPlaybackId) {
    return {
      error: "hero_video_signing_unconfigured",
    };
  }

  return {
    playbackId: DEFAULT_HERO_PLAYBACK_ID,
    requiresToken: false,
  };
}

function sendJson(response, statusCode, body) {
  response.statusCode = statusCode;
  response.setHeader("content-type", "application/json; charset=utf-8");
  response.setHeader("cache-control", "no-store, max-age=0");
  response.setHeader("x-content-type-options", "nosniff");
  response.end(JSON.stringify(body));
}

export default function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("allow", "GET");
    sendJson(response, 405, { error: "method_not_allowed" });
    return;
  }

  const configuredPlayback = getConfiguredPlayback();

  if (configuredPlayback.error) {
    sendJson(response, 503, { error: configuredPlayback.error });
    return;
  }

  const sessionId = randomUUID();
  const expiresAt = Math.floor(Date.now() / 1000) + getTokenTtlSeconds();
  const playbackToken = configuredPlayback.requiresToken
    ? signMuxPlaybackToken({ playbackId: configuredPlayback.playbackId, expiresAt, sessionId })
    : null;

  sendJson(response, 200, {
    playbackId: configuredPlayback.playbackId,
    expiresAt,
    tokens: playbackToken ? { playback: playbackToken } : undefined,
    policy: playbackToken ? "signed" : "server-session",
  });
}
