import { lazy, Suspense, useEffect, useState } from "react";
import type { SeminarContent } from "../data/seminarContent";
import { SplineHero } from "./SplineHero";

type HeroSectionProps = {
  content: SeminarContent;
};

type HeroVideoResolution = "720p" | "1080p" | "1440p";
type HeroVideoSession = {
  playbackId: string;
  expiresAt?: number;
  tokens?: {
    playback?: string;
  };
};

const LazyMuxPlayer = lazy(() => import("@mux/mux-player-react"));
const HERO_POSTER_SRC = "/images/hero-poster.webp";
const FALLBACK_HERO_PLAYBACK_ID = "ozBbHDhW6Noi71TFb00tsI7zpdF202dMd4eakM6pA91VQ";

function getHeroVideoResolution(): HeroVideoResolution {
  if (typeof window === "undefined") return "1080p";
  if (window.matchMedia("(min-width: 1280px)").matches) return "1440p";
  if (window.matchMedia("(min-width: 768px)").matches) return "1080p";
  return "720p";
}

export function HeroSection({ content }: HeroSectionProps) {
  const [heroVideoResolution, setHeroVideoResolution] = useState(getHeroVideoResolution);
  const [heroVideoSession, setHeroVideoSession] = useState<HeroVideoSession | null>(null);
  const [isHeroVideoReady, setIsHeroVideoReady] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadHeroVideoSession() {
      try {
        const response = await fetch("/api/hero-video-session", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Hero video session failed: ${response.status}`);
        }

        const session = (await response.json()) as HeroVideoSession;

        if (!controller.signal.aborted && session.playbackId) {
          setHeroVideoSession(session);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.warn(error);
          setHeroVideoSession({ playbackId: FALLBACK_HERO_PLAYBACK_ID });
        }
      }
    }

    void loadHeroVideoSession();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const mediaQueries = [
      window.matchMedia("(min-width: 768px)"),
      window.matchMedia("(min-width: 1280px)"),
    ];

    const updateResolution = () => {
      setHeroVideoResolution(getHeroVideoResolution());
    };

    mediaQueries.forEach((query) => {
      query.addEventListener("change", updateResolution);
    });

    return () => {
      mediaQueries.forEach((query) => {
        query.removeEventListener("change", updateResolution);
      });
    };
  }, []);

  useEffect(() => {
    setIsHeroVideoReady(false);
  }, [heroVideoResolution, heroVideoSession?.playbackId]);

  return (
    <section id="top" className="relative h-[450px] overflow-clip bg-ink sm:h-[650px] md:h-[700px] lg:h-[790px] xl:h-[950px]">
      <div className="absolute left-0 top-0 h-[292px] w-full overflow-hidden bg-ink sm:h-[610px] md:h-[660px] lg:h-[740px] xl:h-[850px]" data-kv-from="right" data-kv-delay="0">
        <div className="hero-media-frame absolute inset-x-0 top-0 aspect-[1512/850] w-full overflow-hidden sm:mx-auto sm:max-w-[1512px] xl:left-1/2 xl:right-auto xl:h-[850px] xl:w-[1512px] xl:-translate-x-1/2 xl:[aspect-ratio:auto]">
          <img
            src={HERO_POSTER_SRC}
            alt=""
            aria-hidden="true"
            className="hero-media-poster absolute inset-0 h-full w-full"
            decoding="async"
            fetchPriority="high"
            draggable={false}
          />
          {heroVideoSession ? (
            <Suspense fallback={null}>
              <LazyMuxPlayer
                key={`${heroVideoSession.playbackId}-${heroVideoSession.expiresAt ?? "session"}`}
                playbackId={heroVideoSession.playbackId}
                tokens={heroVideoSession.tokens}
                streamType="on-demand"
                preferPlayback="mse"
                minResolution={heroVideoResolution}
                maxResolution={heroVideoResolution}
                renditionOrder="desc"
                capRenditionToPlayerSize={false}
                className="hero-video-player relative z-[1] h-full w-full transition-opacity duration-700"
                style={{ opacity: isHeroVideoReady ? 1 : 0 }}
                autoPlay="muted"
                muted
                loop
                playsInline
                preload="metadata"
                poster={HERO_POSTER_SRC}
                aria-hidden="true"
                onLoadedData={() => setIsHeroVideoReady(true)}
                onCanPlay={() => setIsHeroVideoReady(true)}
              />
            </Suspense>
          ) : null}
        </div>
        <SplineHero className="spline-hero--video-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-black" data-hero-overlay style={{ opacity: 0.18 }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[110px] bg-gradient-to-b from-transparent to-ink sm:h-[220px] md:h-[240px] lg:h-[260px] xl:h-[160px]" />
      </div>

      <div id="overview" className="absolute inset-0 z-10 mx-auto h-full w-full max-w-[1512px] px-6 md:px-0">
        <div className="sm:hidden">
          <div
            className="absolute left-[30px] top-[72px] w-[157px]"
            data-kv-from="left"
            data-kv-delay="0.32"
            data-kv-distance="72"
            data-kv-duration="1.24"
          >
            <h1 className="font-display tracking-[-0.05em] text-white">
              <span className="block whitespace-nowrap text-[28px] leading-[34px]">{content.hero.title.first}</span>
              <span className="block whitespace-nowrap leading-[30px]">
                <span className="text-[22px] italic">{content.hero.title.connector}</span>
                <span className="ml-1 text-[36px] font-medium italic text-electric">Collectible</span>
              </span>
              <span className="mt-[-2px] block text-[36px] font-medium italic leading-[30px] text-electric">Asset</span>
            </h1>
          </div>
          <p
            className="absolute inset-x-0 top-[200px] mx-auto w-[329px] max-w-[calc(100%-60px)] text-left font-serif text-[12px] leading-[20px] text-mist"
            data-kv-from="left"
            data-kv-delay="0.52"
            data-kv-distance="72"
            data-kv-duration="1.2"
          >
            {content.hero.subtitle}
          </p>
          <div
            className="absolute inset-x-0 top-[254px] mx-auto w-[329px] max-w-[calc(100%-60px)] text-left"
            data-kv-from="up"
            data-kv-delay="0.78"
            data-kv-distance="42"
            data-kv-duration="1.2"
            data-hero-intro
          >
            <img src={content.intro.iconSrc} alt={content.intro.iconAlt} className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
            <div className="mt-[10px] w-full">
              <p className="font-serif text-[12px] font-bold leading-[20px] text-white">{content.hero.lead}</p>
              <p className="mt-[16px] font-serif text-[12px] font-semibold leading-[20px] text-mist">{content.hero.body}</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto hidden h-full w-[calc(100%-64px)] max-w-[1180px] sm:block lg:w-[calc(100%-96px)] xl:w-full xl:max-w-[1512px]">
          <div
            className="absolute left-0 top-[118px] w-full max-w-[440px] lg:top-[145px] lg:max-w-[560px] xl:left-[96px] xl:top-[182px] xl:max-w-[675px]"
            data-kv-from="left"
            data-kv-delay="0.32"
            data-kv-distance="86"
            data-kv-duration="1.28"
          >
            <h1 className="font-display tracking-[-0.05em] text-white">
              <span className="block whitespace-nowrap text-[42px] leading-[56px] lg:text-[58px] lg:leading-[74px] xl:text-[88px] xl:leading-[112px]">
                {content.hero.title.first}
                <span className="ml-2 text-[34px] italic lg:text-[46px] xl:ml-4 xl:text-[70px]">{content.hero.title.connector}</span>
              </span>
              <span className="mt-[-4px] block whitespace-nowrap text-[52px] font-medium italic leading-[60px] text-electric lg:text-[70px] lg:leading-[80px] xl:mt-[-6px] xl:text-[108px] xl:leading-[112px]">
                {content.hero.title.last}
              </span>
            </h1>
          </div>
          <div
            className="absolute inset-x-0 top-[284px] mx-auto hidden w-full max-w-[620px] text-left sm:block md:top-[380px] lg:top-[430px] lg:max-w-[620px] xl:hidden"
          >
            <p
              className="font-serif text-[15px] leading-[28px] text-mist lg:text-base lg:leading-8"
              data-kv-from="left"
              data-kv-delay="0.52"
              data-kv-distance="86"
              data-kv-duration="1.22"
            >
              {content.hero.subtitle}
            </p>
            <div
              className="mt-[24px] md:mt-[28px]"
              data-kv-from="up"
              data-kv-delay="0.78"
              data-kv-distance="48"
              data-kv-duration="1.22"
              data-hero-intro
            >
              <img src={content.intro.iconSrc} alt={content.intro.iconAlt} className="h-7 w-7 shrink-0 lg:h-8 lg:w-8" aria-hidden="true" />
              <div className="mt-[12px] w-full">
                <p className="font-serif text-[15px] font-bold leading-[30px] text-white">{content.hero.lead}</p>
                <p className="mt-[18px] font-serif text-[15px] font-normal leading-[30px] text-mist">{content.hero.body}</p>
              </div>
            </div>
          </div>
          <p
            className="absolute hidden font-serif text-mist xl:left-[96px] xl:top-[450px] xl:block xl:w-[510px] xl:text-left xl:text-lg xl:leading-9"
            data-kv-from="left"
            data-kv-delay="0.52"
            data-kv-distance="86"
            data-kv-duration="1.22"
          >
            {content.hero.subtitle}
          </p>
          <div
            className="absolute hidden text-left xl:left-[327px] xl:top-[724px] xl:flex xl:w-[802px] xl:flex-row xl:items-start xl:gap-5"
            data-kv-from="up"
            data-kv-delay="0.78"
            data-kv-distance="52"
            data-kv-duration="1.22"
            data-hero-intro
          >
            <img src={content.intro.iconSrc} alt={content.intro.iconAlt} className="h-7 w-7 shrink-0 lg:h-8 lg:w-8 xl:mt-1 xl:h-9 xl:w-9" aria-hidden="true" />
            <div className="w-full xl:w-[746px]">
              <p className="font-serif text-[15px] font-bold leading-[30px] text-white xl:text-lg xl:leading-9">{content.hero.lead}</p>
              <p className="mt-[20px] font-serif text-[15px] font-normal leading-[30px] text-mist xl:mt-[26px] xl:text-lg xl:leading-9">{content.hero.body}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
