type SectionHeadingProps = {
  title: string;
};

export function SectionHeading({ title }: SectionHeadingProps) {
  const isWideMobileHeading = title !== "Agenda";
  const leftMobileSlash = isWideMobileHeading ? "left-[20px]" : "left-[73px]";
  const rightMobileSlash = isWideMobileHeading ? "right-[20px]" : "right-[73px]";

  return (
    <div className="relative mx-auto h-[100px] w-full max-w-[329px] md:h-[120px] md:max-w-[675px]" data-aos="content-reveal-up">
      <span className={`absolute ${leftMobileSlash} top-[48px] h-[2px] w-[60px] origin-center -rotate-[60deg] bg-electric md:left-[58px] md:top-[58px] md:h-[2.6px] md:w-[127px]`} aria-hidden="true" />
      <h2 className="absolute inset-x-0 top-[2px] text-center font-display text-[32px] font-bold italic leading-[95px] tracking-[-0.05em] text-white md:top-[18px] md:text-[64px]">
        {title}
      </h2>
      <span className={`absolute ${rightMobileSlash} top-[48px] h-[2px] w-[60px] origin-center -rotate-[60deg] bg-electric md:right-[58px] md:top-[58px] md:h-[2.6px] md:w-[127px]`} aria-hidden="true" />
    </div>
  );
}
