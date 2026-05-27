import { SectionHeading } from "./SectionHeading";

type AgendaRow = {
  time: string;
  session: string;
  speaker: string;
  highlighted?: boolean;
};

type AgendaSectionProps = {
  title: string;
  rows: AgendaRow[];
};

export function AgendaSection({ title, rows }: AgendaSectionProps) {
  return (
    <section id="agenda" className="h-auto bg-ink px-0 pb-[6px] pt-[30px] sm:px-0 sm:pb-[48px] sm:pt-[60px] xl:h-[923px] xl:px-0 xl:pb-0 xl:pt-[95px]">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading title={title} />
        <div className="mx-auto mt-[30px] w-[calc(100%-64px)] max-w-[329px] overflow-visible sm:mt-[54px] sm:max-w-[620px] xl:ml-[96px] xl:mt-[88px] xl:w-auto xl:max-w-[1149px]">
          <div className="agenda-table-reveal min-w-0" data-reveal-stagger="agenda" data-reverse data-reveal-start="top 72%" data-stagger-amount="0.045">
          <div
            className="hidden min-h-[67px] grid-cols-[145px_minmax(0,510px)_minmax(0,454px)] items-center gap-2 border-b-[2px] border-electric/80 px-3 xl:grid"
            data-agenda-row
          >
            {["Time", "Session", "Speaker"].map((label) => (
              <div
                key={label}
                className="font-display text-4xl font-bold leading-none tracking-[-0.05em] text-frost"
              >
                {label}
              </div>
            ))}
          </div>
          {rows.map((row, index) => (
            <div
              key={`${row.time}-${row.session}`}
              data-agenda-row
              className={`relative flex ${row.highlighted ? "min-h-[60px]" : "min-h-[96px]"} flex-col gap-[6px] overflow-hidden border-b-[2px] border-electric/80 px-[10px] py-[14px] sm:px-[18px] sm:py-[18px] xl:grid xl:min-h-[60px] xl:grid-cols-[145px_minmax(0,510px)_minmax(0,454px)] xl:items-center xl:gap-2 xl:px-3 xl:py-0 ${index === 0 ? "border-t-[2px] xl:border-t-0" : ""}`}
            >
              {row.highlighted ? (
                <span className="agenda-row-gradient-fill pointer-events-none absolute inset-0 z-0" data-agenda-fill aria-hidden="true" />
              ) : null}
              <p className="relative z-10 font-serif text-[12px] leading-[20px] text-white sm:text-[14px] sm:leading-[24px] xl:text-center xl:text-[16.5px] xl:leading-[50px]">{row.time}</p>
              <p className="relative z-10 font-serif text-[12px] leading-[20px] tracking-[-0.03em] text-white sm:text-[14px] sm:leading-[24px] xl:text-[16.5px] xl:leading-[1.45] xl:tracking-normal">
                {row.session}
              </p>
              <p className={`relative z-10 font-serif text-[12px] leading-[20px] tracking-[-0.03em] text-white sm:text-[14px] sm:leading-[24px] xl:text-[16.5px] xl:leading-[1.45] xl:tracking-normal ${row.speaker && !row.highlighted ? "" : "hidden xl:block"}`}>
                {row.speaker}
              </p>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
