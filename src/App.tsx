import { useEffect } from "react";
import AOS from "aos";
import { seminarContent } from "./data/seminarContent";
import { HeroSection } from "./components/HeroSection";
import { InfoStrip } from "./components/InfoStrip";
import { CtaSection } from "./components/CtaSection";
import { AgendaSection } from "./components/AgendaSection";
import { SpeakersSection } from "./components/SpeakersSection";
import { EventNoticeSection } from "./components/EventNoticeSection";
import { Footer } from "./components/Footer";
import { MobileFixedActions } from "./components/MobileFixedActions";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1350,
      easing: "ease-out-cubic",
      once: true,
      offset: 90,
      anchorPlacement: "top-bottom",
    });
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-ink text-white selection:bg-electric selection:text-ink">
      <main>
        <HeroSection content={seminarContent} />
        <InfoStrip items={seminarContent.info} />
        <CtaSection label={seminarContent.hero.cta} />
        <AgendaSection title={seminarContent.sections.agenda} rows={seminarContent.agenda} />
        <SpeakersSection title={seminarContent.sections.speakers} speakers={seminarContent.speakers} />
        <EventNoticeSection title={seminarContent.sections.notice} notice={seminarContent.notice} />
      </main>
      <Footer content={seminarContent} />
      <MobileFixedActions {...seminarContent.fixedActions} />
    </div>
  );
}
