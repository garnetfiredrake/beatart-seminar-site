import { useEffect, useRef, type PointerEvent } from "react";

type AccessButtonProps = {
  label: string;
  href?: string;
};

export function AccessButton({ label, href = "#notice" }: AccessButtonProps) {
  const touchReleaseTimer = useRef<number | undefined>(undefined);
  const lastPointerType = useRef<string | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (touchReleaseTimer.current !== undefined) {
        window.clearTimeout(touchReleaseTimer.current);
      }
    };
  }, []);

  const shouldDelayClickForPressFeedback = () => {
    if (typeof window === "undefined") return false;
    return (
      lastPointerType.current !== "mouse" ||
      window.matchMedia("(hover: none), (pointer: coarse), (max-width: 1023px)").matches
    );
  };

  const activatePressFeedback = (target: HTMLAnchorElement) => {
    target.classList.add("is-touch-active");

    if (touchReleaseTimer.current !== undefined) {
      window.clearTimeout(touchReleaseTimer.current);
    }

    touchReleaseTimer.current = window.setTimeout(() => {
      target.classList.remove("is-touch-active");
      touchReleaseTimer.current = undefined;
    }, 1120);
  };

  const handlePointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
    lastPointerType.current = event.pointerType;

    if (event.pointerType !== "mouse" || shouldDelayClickForPressFeedback()) {
      activatePressFeedback(event.currentTarget);
    }
  };

  const handlePointerRelease = (event: PointerEvent<HTMLAnchorElement>) => {
    if (!event.currentTarget.classList.contains("is-touch-active")) return;

    activatePressFeedback(event.currentTarget);
  };

  return (
    <a
      href={href}
      data-reveal="up"
      data-reverse
      data-reveal-start="top 95%"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerRelease}
      onPointerCancel={handlePointerRelease}
      onPointerLeave={handlePointerRelease}
      onBlur={(event) => event.currentTarget.classList.remove("is-touch-active")}
      className="access-button relative isolate inline-flex h-12 w-full max-w-[329px] items-center justify-center rounded-[10px] border border-frost bg-ink p-px font-button text-[18px] leading-none text-white transition-[border-color,box-shadow] duration-500 ease-out hover:border-white hover:shadow-[0_0_34px_rgba(1,180,255,0.48),0_20px_76px_rgba(1,180,255,0.26)] focus:outline-none focus-visible:ring-2 focus-visible:ring-electric sm:h-16 sm:max-w-[560px] sm:rounded-[14px] sm:text-[24px] xl:h-20 xl:max-w-[746px] xl:rounded-[18px] xl:text-[36px]"
    >
      <span className="access-button__glow pointer-events-none absolute -inset-[3px] -z-10 rounded-[13px] bg-[radial-gradient(circle_at_50%_50%,rgba(1,180,255,0.32),transparent_68%)] opacity-0 blur-xl sm:rounded-[17px] xl:rounded-[21px]" />
      <span className="access-button__surface relative flex h-full w-full items-center justify-center overflow-hidden rounded-[9px] bg-ink px-8 sm:rounded-[12px] xl:rounded-[16px] transform-gpu">
        <span className="access-button__wash absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(1,180,255,0.26),transparent_62%),linear-gradient(90deg,rgba(1,180,255,0.2),rgba(196,238,255,0.08),rgba(1,180,255,0.18))] opacity-0" />
        <span className="access-button__shine" />
        <span className="relative">{label}</span>
      </span>
    </a>
  );
}
