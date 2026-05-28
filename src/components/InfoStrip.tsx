type InfoItem = {
  iconSrc: string;
  iconAlt: string;
  title: string;
  body: string[];
};

type InfoStripProps = {
  items: InfoItem[];
};

export function InfoStrip({ items }: InfoStripProps) {
  const mobileTopClass = ["top-[28px]", "top-[167px]", "top-[353px]"];

  return (
    <section className="bg-ink px-0 py-0 sm:px-0 sm:py-[54px] xl:h-[300px] xl:px-0 xl:py-0">
      <div className="relative mx-auto h-[454px] max-w-[393px] sm:hidden" data-reveal-stagger="up" data-reverse data-reveal-after="hero-intro" data-reveal-start="top 82%" data-reveal-distance="34" data-reveal-duration="1.22" data-stagger-amount="0.5">
        {items.map((item, index) => (
          <article
            key={item.title}
            className={`absolute inset-x-0 ${mobileTopClass[index]} text-center`}
          >
            <img src={item.iconSrc} alt={item.iconAlt} className="mx-auto h-[18px] w-[18px] object-contain" />
            <div className="mx-auto mt-[15px] h-px w-[227px] bg-electric/70" aria-hidden="true" />
            <h2 className="mt-[12px] font-display text-[22px] font-semibold leading-none tracking-[-0.05em] text-frost">
              {item.title}
            </h2>
            <div className="mx-auto mt-[15px] max-w-[329px] font-serif text-[12px] font-bold leading-[20px] text-frost">
              {(index === 2 ? [item.body.join(" ")] : item.body).map((line) => (
                <p key={line} className="whitespace-nowrap">
                  {line}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto hidden w-[calc(100%-64px)] max-w-[560px] flex-col gap-[56px] sm:flex xl:hidden" data-reveal-stagger="up" data-reverse data-reveal-after="hero-intro" data-reveal-start="top 82%" data-reveal-distance="38" data-reveal-duration="1.26" data-stagger-amount="0.5">
        {items.map((item, index) => (
          <article
            key={item.title}
            className="text-center"
          >
            <img src={item.iconSrc} alt={item.iconAlt} className="mx-auto h-7 w-7 object-contain" />
            <h2 className="mt-4 font-display text-[30px] font-semibold leading-none tracking-[-0.05em] text-frost">
              {item.title}
            </h2>
            <div className="mx-auto mt-4 h-px w-full max-w-[363px] bg-electric/60" aria-hidden="true" />
            <div className="mx-auto mt-5 max-w-[480px] font-serif text-[15px] font-bold leading-7 text-frost">
              {(index === 2 ? [item.body.join(" ")] : item.body).map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="relative mx-auto hidden h-full max-w-[1320px] xl:block">
        <div className="grid grid-cols-[repeat(3,363px)] gap-[115px]" data-reveal-stagger="up" data-reverse data-reveal-after="hero-intro" data-reveal-start="top 82%" data-reveal-distance="42" data-reveal-duration="1.28" data-stagger-amount="0.5">
          {items.map((item, index) => (
            <article
              key={item.title}
              className="relative h-[300px] w-[363px]"
            >
              <div className="absolute left-0 top-[110px] flex items-center gap-11">
                <img
                  src={item.iconSrc}
                  alt={item.iconAlt}
                  className="h-9 w-9 shrink-0 object-contain"
                />
                <h2 className="whitespace-nowrap font-display text-4xl font-semibold leading-none tracking-[-0.05em] text-frost">
                  {item.title}
                </h2>
              </div>
              <div className="absolute left-0 top-[171px] h-[2px] w-[363px] bg-electric/50" aria-hidden="true" />
              <div className="absolute left-[80px] top-[190px] w-[310px] font-serif text-lg font-bold leading-9 text-frost">
                {item.body.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
