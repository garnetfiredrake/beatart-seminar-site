type AccessButtonProps = {
  label: string;
  href?: string;
};

export function AccessButton({ label, href = "#notice" }: AccessButtonProps) {
  return (
    <a
      href={href}
      data-aos="content-reveal-up"
      className="group relative isolate inline-flex h-12 w-full max-w-[329px] items-center justify-center rounded-[10px] border border-frost bg-ink p-px font-button text-[18px] leading-none text-white transition-[border-color,box-shadow] duration-500 ease-out hover:border-white hover:shadow-[0_0_34px_rgba(1,180,255,0.48),0_20px_76px_rgba(1,180,255,0.26)] focus:outline-none focus-visible:ring-2 focus-visible:ring-electric sm:h-16 sm:max-w-[560px] sm:rounded-[14px] sm:text-[24px] xl:h-20 xl:max-w-[746px] xl:rounded-[18px] xl:text-[36px]"
    >
      <span className="pointer-events-none absolute -inset-[3px] -z-10 rounded-[13px] bg-[radial-gradient(circle_at_50%_50%,rgba(1,180,255,0.32),transparent_68%)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 sm:rounded-[17px] xl:rounded-[21px]" />
      <span className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[9px] bg-ink px-8 transition-colors duration-500 ease-out group-hover:bg-[#03131C] sm:rounded-[12px] xl:rounded-[16px] transform-gpu">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(1,180,255,0.26),transparent_62%),linear-gradient(90deg,rgba(1,180,255,0.2),rgba(196,238,255,0.08),rgba(1,180,255,0.18))] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute -inset-y-7 left-0 w-1/3 -translate-x-[150%] -skew-x-[20deg] bg-white/55 blur-[5px] opacity-0 transition-all duration-700 ease-out group-hover:translate-x-[360%] group-hover:opacity-75" />
        <span className="relative">{label}</span>
      </span>
    </a>
  );
}
