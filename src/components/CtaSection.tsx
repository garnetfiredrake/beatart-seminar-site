import { AccessButton } from "./AccessButton";

type CtaSectionProps = {
  label: string;
};

export function CtaSection({ label }: CtaSectionProps) {
  return (
    <section id="request-access" className="h-[88px] bg-ink px-0 pt-[30px] sm:h-[190px] sm:px-0 sm:pt-[70px] xl:h-[237px] xl:px-0 xl:pt-[108px]">
      <div className="mx-auto flex max-w-[329px] justify-center sm:w-[calc(100%-64px)] sm:max-w-[1320px]">
        <AccessButton label={label} />
      </div>
    </section>
  );
}
