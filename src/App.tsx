import { seminarContent } from "./data/seminarContent";
import { HeroSection } from "./components/HeroSection";
import { InfoStrip } from "./components/InfoStrip";
import { CtaSection } from "./components/CtaSection";
import { AgendaSection } from "./components/AgendaSection";
import { SpeakersSection } from "./components/SpeakersSection";
import { EventNoticeSection } from "./components/EventNoticeSection";
import { Footer } from "./components/Footer";
import { FloatingHeader } from "./components/FloatingHeader";
import { MobileFixedActions } from "./components/MobileFixedActions";

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink text-white selection:bg-electric selection:text-ink">
      <FloatingHeader logoSrc={seminarContent.brand.logoSrc} logoAlt={seminarContent.brand.logoAlt} />
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
