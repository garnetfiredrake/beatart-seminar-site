import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

type ScrollTarget = number | string | HTMLElement;

const EASE = "power2.out";
const HERO_EASE = "power3.out";
let activeCleanup: (() => void) | undefined;

const REVEAL_DIRECTIONS = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: -28, y: 0 },
  right: { x: 28, y: 0 },
  fade: { x: 0, y: 0 },
};

const KV_DIRECTIONS = {
  up: { x: 0, y: 32 },
  down: { x: 0, y: -32 },
  left: { x: -44, y: 0 },
  right: { x: 44, y: 0 },
  fade: { x: 0, y: 0 },
};

function parseNumber(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function directionProps(
  value: string | undefined,
  map: Record<string, { x: number; y: number }>,
  fallback: keyof typeof REVEAL_DIRECTIONS,
) {
  return map[value || fallback] || map[fallback];
}

function isVisibleElement(el: Element) {
  const rect = el.getBoundingClientRect();
  const style = window.getComputedStyle(el);
  return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
}

function getAnchorTarget(hash: string) {
  if (hash === "#top") return 0;
  try {
    return document.querySelector(hash) as HTMLElement | null;
  } catch {
    return null;
  }
}

function getMotionBreakpoint() {
  if (window.innerWidth >= 1280) return "xl";
  if (window.innerWidth >= 640) return "sm";
  return "base";
}

function getStickyLogoOffset() {
  if (window.innerWidth >= 1280) return 14;
  if (window.innerWidth >= 640) return 10;
  return 8;
}

export function initScrollMotion() {
  activeCleanup?.();

  if (!document.querySelector("[data-kv-from]")) {
    const frame = window.requestAnimationFrame(() => {
      initScrollMotion();
    });
    const cleanup = () => {
      window.cancelAnimationFrame(frame);
      if (activeCleanup === cleanup) {
        activeCleanup = undefined;
      }
    };
    activeCleanup = cleanup;
    return cleanup;
  }

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const canUseLenis = Object.isExtensible(window);
    const initialized: HTMLElement[] = [];
    const motionBreakpoint = getMotionBreakpoint();
    let reinitFrame: number | undefined;

    const lenis = canUseLenis
      ? new Lenis({
          lerp: 0.1,
          smoothWheel: true,
          syncTouch: true,
          syncTouchLerp: 0.075,
          touchMultiplier: 1,
          wheelMultiplier: 1,
        })
      : null;

    const lenisTicker = (time: number) => {
      lenis?.raf(time * 1000);
    };

    document.documentElement.dataset.scrollMotion = "ready";
    document.documentElement.dataset.smoothScroll = lenis ? "lenis" : "gsap";
    let delayedCtaScrollTimer: number | undefined;
    let delayedCtaReleaseTimer: number | undefined;

    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(lenisTicker);
      gsap.ticker.lagSmoothing(0);
    }

    const scrollTo = (target: ScrollTarget, offset = 0) => {
      const easing = (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t));

      if (lenis) {
        lenis.scrollTo(target, { offset, duration: 0.8, easing });
        return;
      }

      if (typeof target === "number") {
        gsap.to(window, { scrollTo: target, duration: 0.65, ease: EASE });
        return;
      }

      gsap.to(window, {
        scrollTo: { y: target, offsetY: Math.abs(offset) },
        duration: 0.65,
        ease: EASE,
      });
    };

    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;

      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = getAnchorTarget(href);
      if (target === null) return;

      if (link.classList.contains("access-button") && window.matchMedia("(hover: none), (pointer: coarse), (max-width: 1023px)").matches) {
        event.preventDefault();
        link.classList.add("is-touch-active");

        if (delayedCtaScrollTimer !== undefined) {
          window.clearTimeout(delayedCtaScrollTimer);
        }
        if (delayedCtaReleaseTimer !== undefined) {
          window.clearTimeout(delayedCtaReleaseTimer);
        }

        delayedCtaScrollTimer = window.setTimeout(() => {
          scrollTo(target, href === "#top" ? 0 : -72);
          delayedCtaScrollTimer = undefined;
        }, 720);

        delayedCtaReleaseTimer = window.setTimeout(() => {
          link.classList.remove("is-touch-active");
          delayedCtaReleaseTimer = undefined;
        }, 1120);

        return;
      }

      event.preventDefault();
      scrollTo(target, href === "#top" ? 0 : -72);
    };

    document.addEventListener("click", onAnchorClick);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-kv-from]").forEach((el) => {
        const dir = directionProps(el.dataset.kvFrom, KV_DIRECTIONS, "up");
        const delay = parseNumber(el.dataset.kvDelay, 0);

        gsap.fromTo(
          el,
          { autoAlpha: 0, x: dir.x, y: dir.y },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            delay,
            duration: 0.9,
            ease: HERO_EASE,
            force3D: true,
          },
        );
      });

      const heroOverlay = document.querySelector<HTMLElement>("[data-hero-overlay]");
      if (heroOverlay) {
        gsap.fromTo(
          heroOverlay,
          { opacity: 0.18 },
          {
            opacity: 0.48,
            ease: "none",
            scrollTrigger: {
              trigger: "#top",
              start: "top top",
              end: "+=720",
              scrub: true,
            },
          },
        );
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        initialized.push(el);
        el.setAttribute("data-reveal-init", "");

        const dir = directionProps(el.dataset.reveal, REVEAL_DIRECTIONS, "up");
        const delay = parseNumber(el.dataset.revealDelay, 0);
        const duration = parseNumber(el.dataset.revealDuration, 0.68);
        const start = el.dataset.revealStart || "top 78%";
        const useReverse = el.hasAttribute("data-reverse");

        gsap.fromTo(
          el,
          { autoAlpha: 0, x: dir.x, y: dir.y },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            delay,
            duration,
            ease: EASE,
            force3D: true,
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: useReverse ? "play none none reverse" : "play none none none",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((container) => {
        const children = Array.from(container.children).filter(isVisibleElement) as HTMLElement[];
        if (!children.length) return;

        const variant = container.dataset.revealStagger || "up";
        const useReverse = container.hasAttribute("data-reverse");
        const start = container.dataset.revealStart || "top 78%";
        const amount = parseNumber(container.dataset.staggerAmount, 0.08);

        initialized.push(container);
        container.setAttribute("data-reveal-init", "");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start,
            toggleActions: useReverse ? "play none none reverse" : "play none none none",
          },
        });

        if (variant === "agenda") {
          const fills = children.flatMap((child) => Array.from(child.querySelectorAll<HTMLElement>("[data-agenda-fill]")));

          tl.fromTo(
            children,
            { autoAlpha: 0, x: -18 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.54,
              stagger: amount,
              ease: EASE,
              force3D: true,
            },
          );

          if (fills.length) {
            tl.fromTo(
              fills,
              { autoAlpha: 0, scaleX: 0, transformOrigin: "left center" },
              {
                autoAlpha: 1,
                scaleX: 1,
                duration: 0.62,
                stagger: amount,
                ease: EASE,
                force3D: true,
              },
              0.08,
            );
          }

          return;
        }

        const dir = directionProps(variant, REVEAL_DIRECTIONS, "up");
        const fromVars = variant === "soft-image" ? { autoAlpha: 0, x: 0, y: 26, scale: 0.985 } : { autoAlpha: 0, x: dir.x, y: dir.y };
        const toVars = variant === "soft-image" ? { autoAlpha: 1, x: 0, y: 0, scale: 1 } : { autoAlpha: 1, x: 0, y: 0 };

        tl.fromTo(children, fromVars, {
          ...toVars,
          duration: 0.64,
          stagger: amount,
          ease: EASE,
          force3D: true,
        });
      });

      const header = document.querySelector<HTMLElement>("[data-scroll-header]");
      const headerLogo = header?.querySelector<HTMLElement>("[data-logo-target]");

      if (header && headerLogo) {
        gsap.set(header, { "--header-bg-opacity": 0 } as gsap.TweenVars);
        gsap.set(headerLogo, { autoAlpha: 1, y: 0, force3D: true });

        gsap
          .timeline({
            scrollTrigger: {
              start: 0,
              end: 160,
              scrub: 0.25,
            },
          })
          .to(header, { "--header-bg-opacity": 1, duration: 1, ease: "none" } as gsap.TweenVars, 0)
          .to(headerLogo, { y: getStickyLogoOffset(), duration: 1, ease: "none", force3D: true }, 0);
      }

      ScrollTrigger.refresh();
    });

    const refresh = () => {
      if (getMotionBreakpoint() !== motionBreakpoint) {
        reinitFrame ??= window.requestAnimationFrame(() => {
          reinitFrame = undefined;
          initScrollMotion();
        });
        return;
      }

      lenis?.resize();
      ScrollTrigger.refresh();
    };

    if ("fonts" in document) {
      void document.fonts.ready.then(refresh);
    }
    window.addEventListener("load", refresh, { once: true });
    window.addEventListener("resize", refresh);

    const cleanup = () => {
      if (reinitFrame !== undefined) {
        window.cancelAnimationFrame(reinitFrame);
      }
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      document.removeEventListener("click", onAnchorClick);
      if (delayedCtaScrollTimer !== undefined) {
        window.clearTimeout(delayedCtaScrollTimer);
      }
      if (delayedCtaReleaseTimer !== undefined) {
        window.clearTimeout(delayedCtaReleaseTimer);
      }
      initialized.forEach((el) => el.removeAttribute("data-reveal-init"));
      ctx.revert();
      if (lenis) {
        gsap.ticker.remove(lenisTicker);
        lenis.destroy();
      }
      delete document.documentElement.dataset.scrollMotion;
      delete document.documentElement.dataset.smoothScroll;
      if (activeCleanup === cleanup) {
        activeCleanup = undefined;
      }
    };

    activeCleanup = cleanup;
    return cleanup;
}

export function destroyScrollMotion() {
  activeCleanup?.();
}
