import type { SeminarContent } from "../data/seminarContent";

type FooterProps = {
  content: SeminarContent;
};

export function Footer({ content }: FooterProps) {
  return (
    <footer className="h-[150px] bg-ink px-0 pb-0 xl:h-[317px] xl:px-0 xl:pb-0">
      <div className="relative mx-auto h-full w-[calc(100%-64px)] max-w-[329px] border-t border-electric/50 sm:max-w-[620px] lg:max-w-[700px] xl:max-w-[1320px]">
        <div className="grid grid-cols-2 items-start gap-0 pt-[36px] xl:block xl:pt-0">
          <div className="min-w-0 xl:absolute xl:left-[191px] xl:top-[64px]">
            <p className="mb-[24px] text-center font-display text-[22px] font-semibold leading-none tracking-[-0.05em] text-white xl:mb-[49px] xl:text-left xl:font-serif xl:text-lg xl:font-normal xl:tracking-normal">{content.footer.organizerLabel}</p>
            <img src={content.brand.logoSrc} alt={content.brand.logoAlt} className="mx-auto h-[15px] w-[126.224px] xl:mx-0 xl:h-[30px] xl:w-[253px]" />
          </div>
          <div className="min-w-0 xl:absolute xl:left-[846px] xl:top-[64px]">
            <p className="mb-[20px] text-center font-display text-[22px] font-semibold leading-none tracking-[-0.05em] text-white xl:mb-[52px] xl:text-left xl:font-serif xl:text-lg xl:font-normal xl:tracking-normal">{content.footer.partnerLabel}</p>
            <img src={content.brand.partnerLogoSrc} alt={content.brand.partnerAlt} className="mx-auto h-[30.75px] w-[117.579px] xl:mx-0 xl:h-[41px] xl:w-[157px]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
