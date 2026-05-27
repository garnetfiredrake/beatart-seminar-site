type FloatingHeaderProps = {
  logoSrc: string;
  logoAlt: string;
};

export function FloatingHeader({ logoSrc, logoAlt }: FloatingHeaderProps) {
  return (
    <header
      data-scroll-header
      className="site-scroll-header fixed left-0 top-0 z-40 w-full"
    >
      <div className="relative mx-auto h-full w-full sm:w-[calc(100%-64px)] sm:max-w-[1180px] lg:w-[calc(100%-96px)] xl:w-full xl:max-w-[1512px]">
        <a
          href="#top"
          data-logo-target
          aria-label={`${logoAlt} home`}
          className="site-scroll-header__logo absolute left-[30px] top-[36.75px] block h-[15px] w-[126.224px] sm:left-0 sm:top-[48px] sm:h-[22px] sm:w-[185px] lg:top-[60px] lg:h-[26px] lg:w-[219px] xl:left-[96px] xl:top-[91px] xl:h-[30px] xl:w-[253px]"
        >
          <img src={logoSrc} alt={logoAlt} className="h-full w-full" />
        </a>
      </div>
    </header>
  );
}
