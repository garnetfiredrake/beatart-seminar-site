export const seminarContent = {
  brand: {
    logoAlt: "BEATART",
    logoSrc: "/images/beatart-logo.svg",
    wordmarkSrc: "/images/beatart-wordmark.svg",
    partnerAlt: "VIVE Originals",
    partnerLogoSrc: "/images/viveoriginals-logo.png",
  },
  hero: {
    videoSrc: "/images/hero_section_desktop.mov",
    mobileVideoSrc: "/images/hero_section_mobile.mp4",
    fallbackPosterSrc: "",
    title: {
      first: "From Artwork",
      connector: "to",
      last: "Collectible Asset",
    },
    subtitle:
      "A Private Seminar on Digital Art, Onchain Ownership, and the Future of Creative Commerce",
    lead:
      "BEATART helps galleries and art agencies launch curated digital art collections with a premium onchain ownership experience.",
    body:
      "This seminar is designed for art-market professionals who are exploring new ways to present, distribute, and commercialize artworks through blockchain-enabled ownership.",
    cta: "Request Access",
  },
  fixedActions: {
    accessLabel: "Request Access",
    shareLabel: "Share",
    topLabel: "Back to top",
  },
  info: [
    {
      iconSrc: "/images/icon_people.svg",
      iconAlt: "Audience",
      title: "Invitation Audience",
      body: ["Galleries and art agencies"],
    },
    {
      iconSrc: "/images/icon_date.svg",
      iconAlt: "Date",
      title: "Date & Time",
      body: ["Fri, Sep. 17, 2021", "13:00 Guest Check-in", "13:30 - 16:30 Seminar"],
    },
    {
      iconSrc: "/images/icon_map.svg",
      iconAlt: "Venue",
      title: "Venue",
      body: ["Sheraton Grand Taipei Hotel", "B2 Banquet Hall"],
    },
  ],
  intro: {
    iconSrc: "/images/icon_line.svg",
    iconAlt: "",
  },
  sections: {
    agenda: "Agenda",
    speakers: "Featured Speakers",
    notice: "Event Notice",
  },
  agenda: [
    { time: "13:00 - 13:30", session: "Guest Check-in", speaker: "BEATART Team", highlighted: true },
    {
      time: "13:30 - 14:00",
      session: "Opening Remarks: From Artwork to Collectible Asset",
      speaker: "BEATART Team",
    },
    {
      time: "14:00 - 14:40",
      session: "From Artwork to Collectible Asset",
      speaker: "Evelyn Aurel, Head of Digital Art Strategy",
    },
    {
      time: "14:40 - 15:20",
      session: "Onchain Ownership and the New Trust Layer for Art",
      speaker: "Adrian Vale, Nicole Noir, Blockchain Product Advisor",
    },
    {
      time: "15:20 - 15:40",
      session: "Coffee Break & Networking",
      speaker: "",
      highlighted: true,
    },
    {
      time: "15:40 - 16:10",
      session: "Building Collector Relationships Beyond One-Time Sales",
      speaker: "Clara Lumen, Creator Commerce Consultant",
    },
    {
      time: "16:10 - 16:25",
      session: "Launching Curated Digital Art Collections for Galleries",
      speaker: "BEATART Product Team",
    },
    {
      time: "16:25 - 16:30",
      session: "Closing Remarks",
      speaker: "BEATART Team",
      highlighted: true,
    },
  ],
  speakers: [
    {
      imageSrc: "/images/speaker-aurel.png",
      imageAlt: "Evelyn Aurel",
      agency: "AUREL Art Agency",
      role: "Founder & Creative Director",
      name: "Evelyn Aurel",
    },
    {
      imageSrc: "/images/speaker-vanta.png",
      imageAlt: "Adrian Vale",
      agency: "VANTA Art Agency",
      role: "Managing Partner",
      name: "Adrian Vale",
    },
    {
      imageSrc: "/images/speaker-lumen.png",
      imageAlt: "Clara Lumen",
      agency: "LUMEN Art Agency",
      role: "Curatorial Director",
      name: "Clara Lumen",
    },
    {
      imageSrc: "/images/speaker-noira.png",
      imageAlt: "Nicole Noir",
      agency: "NOIRA Art Agency",
      role: "Founder & Art Strategist",
      name: "Nicole Noir",
    },
  ],
  notice: {
    paragraphs: [
      "Seats are limited. The organizer reserves the right to review attendee eligibility and make changes to the agenda. We apologize for any inconvenience this may cause.",
      "Applicants who pass the eligibility review will receive a check-in notice by email two days before the event. The notice will include a check-in number and QR Code as proof of attendance eligibility.",
      "Applicants who do not pass the review will also receive a notification email.",
      "If you do not receive any notification email, please contact the event team at clara@beatart.com",
      "On the event day, please bring the check-in notice containing your check-in number and QR Code to complete the on-site check-in process.",
      "If the event is affected by force majeure, including earthquakes, typhoons, or other natural disasters, the event will be postponed. The new schedule will be announced separately.",
    ],
    email: "clara@beatart.com",
  },
  footer: {
    organizerLabel: "Organizer",
    partnerLabel: "Supporting Partner",
  },
};

export type SeminarContent = typeof seminarContent;
