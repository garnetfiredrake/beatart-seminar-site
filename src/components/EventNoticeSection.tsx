import { SectionHeading } from "./SectionHeading";

type Notice = {
  paragraphs: string[];
  email: string;
};

type EventNoticeSectionProps = {
  title: string;
  notice: Notice;
};

export function EventNoticeSection({ title, notice }: EventNoticeSectionProps) {
  return (
    <section id="notice" className="h-auto bg-ink px-0 pb-[40px] pt-0 xl:h-[786px] xl:px-0 xl:pb-0 xl:pt-[85px]">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading title={title} />
        <ul className="mx-auto mt-[30px] w-[calc(100%-64px)] max-w-[329px] list-disc pl-[18px] text-left font-serif text-[12px] leading-[24px] text-frost sm:max-w-[620px] lg:max-w-[700px] xl:mt-[125px] xl:max-w-[938px] xl:pl-7 xl:text-lg xl:leading-9" data-aos="content-reveal-up">
          {notice.paragraphs.map((paragraph) => (
            <li key={paragraph} className="text-left">
              {paragraph.includes(notice.email) ? (
                <>
                  {paragraph.split(notice.email)[0]}
                  <a href={`mailto:${notice.email}`} className="font-bold text-white underline decoration-white underline-offset-4 transition hover:text-electric">
                    {notice.email}
                  </a>
                </>
              ) : (
                paragraph
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
