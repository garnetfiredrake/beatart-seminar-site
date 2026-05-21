import { SectionHeading } from "./SectionHeading";

type Speaker = {
  imageSrc: string;
  imageAlt: string;
  agency: string;
  role: string;
  name: string;
};

type SpeakersSectionProps = {
  title: string;
  speakers: Speaker[];
};

export function SpeakersSection({ title, speakers }: SpeakersSectionProps) {
  return (
    <section id="speakers" className="h-auto bg-ink px-0 pb-0 pt-0 xl:h-[850px] xl:px-0 xl:pb-0 xl:pt-[95px]">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading title={title} />
        <div className="mx-auto mt-[20px] grid grid-cols-1 gap-0 md:mt-[107px] md:max-w-[570px] md:grid-cols-2 md:gap-[70px] xl:max-w-[1210px] xl:grid-cols-[repeat(4,250px)]">
          {speakers.map((speaker, index) => (
            <article
              key={speaker.name}
              className="group relative h-[303px] text-center md:h-auto"
            >
              <div
                className="absolute inset-x-0 top-0 mx-auto h-[140px] w-[140px] md:static md:h-[250px] md:w-[250px]"
                data-aos="soft-image"
                data-aos-delay={index * 100}
              >
                <img
                  src={speaker.imageSrc}
                  alt={speaker.imageAlt}
                  className="h-full w-full object-contain transition duration-700 group-hover:scale-[1.045]"
                />
              </div>
              <div className="absolute left-0 top-[172px] w-full md:static" data-aos="content-reveal-up" data-aos-delay={index * 100 + 150}>
                <p className="font-display text-[22px] font-bold leading-[26px] tracking-[-0.05em] text-white md:mt-11 md:text-2xl md:leading-none">
                  {speaker.agency}
                </p>
                <p className="mt-[13px] font-display text-[18px] font-bold italic leading-[22px] tracking-[-0.05em] text-white md:mt-4 md:min-h-7 md:text-2xl md:leading-none">
                  {speaker.role}
                </p>
                <h3 className="mt-[10px] font-display text-[28px] font-bold leading-[34px] tracking-[-0.05em] text-electric md:mt-2 md:text-4xl md:leading-[1.65]">
                  {speaker.name}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
