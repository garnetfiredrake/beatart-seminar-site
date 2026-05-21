type MobileFixedActionsProps = {
  accessLabel: string;
  shareLabel: string;
  topLabel: string;
};

export function MobileFixedActions({ accessLabel, shareLabel, topLabel }: MobileFixedActionsProps) {
  const handleShare = async () => {
    try {
      const shareData = {
        title: document.title,
        url: window.location.href,
      };

      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard?.writeText(window.location.href);
    } catch {
      // Native share can be cancelled by the user; no visible UI is needed.
    }
  };

  const scrollToTop = () => {
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fixed right-[13px] z-50 md:hidden">
      <a
        href="#request-access"
        aria-label={accessLabel}
        className="fixed right-[10px] bottom-[100px] flex h-[54px] w-[54px] items-center justify-center rounded-full border border-frost bg-[#161d21]/8 font-button text-[12px] leading-[11.25px] text-white shadow-[0_0_18px_rgba(1,180,255,0.12)] backdrop-blur-sm"
      >
        <span className="w-11 text-center">{accessLabel}</span>
      </a>

      <button
        type="button"
        aria-label={shareLabel}
        onClick={() => void handleShare()}
        className="fixed right-[10px] bottom-[159px] flex h-[54px] w-[54px] items-center justify-center rounded-full border border-frost bg-[#161d21]/8 text-white shadow-[0_0_18px_rgba(1,180,255,0.12)] backdrop-blur-sm"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="18" cy="5" r="3" fill="currentColor" />
          <circle cx="6" cy="12" r="3" fill="currentColor" />
          <circle cx="18" cy="19" r="3" fill="currentColor" />
          <path d="M8.7 10.7L15.3 6.3M8.7 13.3L15.3 17.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <button
        type="button"
        aria-label={topLabel}
        onClick={scrollToTop}
        className="fixed left-[10px] bottom-[100px] flex h-[54px] w-[54px] items-center justify-center rounded-full border border-frost bg-[#161d21]/8 text-white shadow-[0_0_18px_rgba(1,180,255,0.12)] backdrop-blur-sm"
      >
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" aria-hidden="true">
          <path d="M12.5 20.5V7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M7.5 12.5L12.5 7.5L17.5 12.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.5 4.5H18.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
