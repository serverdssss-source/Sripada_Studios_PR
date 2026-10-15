// All copy for the single-page site lives here so it can be edited without
// touching layout code. Items marked TODO need real data/assets from the team.
// Images in /public/images are SAMPLE stock photos: replace each file with a real
// one under the same name (or update the path here).

export const site = {
  name: "Sripada Studios",
  tagline: "Building Brands. Creating Influence. Driving Growth.",
  headline:
    "A Digital & Creative Growth Studio Building Brands Through Strategy, Storytelling & Performance.",
  location: "Bengaluru",
  heroImage: "/images/hero.jpg",
  aboutImage: "/images/about-studio.jpg",
  teamImage: "/images/team.jpg",
  // TODO: confirm public contact details
  contact: {
    email: "hello@sripadastudios.in",
    pressEmail: "press@sripadastudios.in",
    phone: "+91 00000 00000",
  },
  // TODO: replace with real profile URLs
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Industries", href: "#industries" },
  { label: "Work", href: "#work" },
  { label: "Expertise", href: "#expertise" },
  { label: "Founders", href: "#founders" },
  { label: "Journey", href: "#journey" },
  { label: "Media", href: "#media" },
];

export const pillars = ["Strategy", "Content", "Performance", "Digital Experiences"];

export const stats = [
  { value: "50+", label: "Brands managed through Performance Marketing" },
  { value: "10+", label: "Healthcare Brands" },
  { value: "6+", label: "Years of Performance Marketing & Strategy experience" },
  { value: "Multiple", label: "Industry Verticals" },
];

export const statsTagline = "Strategy + Creative + Performance under one roof";

export const verticals = [
  "Cinema",
  "Healthcare",
  "Education",
  "Entertainment",
  "Consumer Brands",
  "B2B",
  "D2C",
];

export type Founder = {
  name: string;
  initials: string;
  role: string;
  bio: string;
  points: string[];
  image: string;
  profileHref: string;
};

export const founders: Founder[] = [
  {
    name: "PV Phani Srivatsa",
    initials: "PS",
    role: "Founder & CEO / Proprietor",
    bio: "A creative entrepreneur focused on building Sripada Studios into a strong digital and creative ecosystem.",
    points: [
      "Entrepreneur & Digital Business Leader",
      "Creative & Brand Strategy",
      "Business Development",
      "Client & Brand Relationships",
      "Building teams and creative ecosystems",
    ],
    image: "/images/founder-phani.jpg",
    profileHref: "#contact", // TODO: link to full profile
  },
  {
    name: "Sathwik NJ",
    initials: "SN",
    role: "Business Head | Performance Marketing & Strategy",
    bio: "6+ years of experience across Performance Marketing, Digital Strategy and Business Growth, working across E-commerce, B2B and B2C brands.",
    points: [
      "6+ Years in Performance Marketing & Strategy",
      "20+ Clients",
      "E-commerce | B2B | B2C",
      "Performance Marketing",
      "Team Building & Business Strategy",
    ],
    image: "/images/founder-sathwik.jpg",
    profileHref: "#contact", // TODO: link to full profile
  },
];

export const expertise = [
  {
    title: "Performance Marketing",
    tags: ["Meta", "Google", "Lead Generation", "Conversion"],
    image: "/images/expertise-performance.jpg",
    image2: "/images/industry-d2c.jpg", // SAMPLE: second image for this service
  },
  {
    title: "Social Media Marketing",
    tags: ["Strategy", "Content", "Community", "Brand Building"],
    image: "/images/expertise-social.jpg",
    image2: "/images/industry-education.jpg", // SAMPLE: second image for this service
  },
  {
    title: "Content & Production",
    tags: ["Video", "Reels", "Brand Films", "Campaign Content"],
    image: "/images/expertise-content.jpg",
    image2: "/images/media-podcast.jpg", // SAMPLE: second image for this service
  },
  {
    title: "Creative & Design",
    tags: ["Branding", "Graphics", "Campaign Creatives", "Digital Assets"],
    image: "/images/expertise-creative.jpg",
    image2: "/images/about-studio.jpg", // SAMPLE: second image for this service
  },
  {
    title: "Digital Strategy",
    tags: ["Go-to-Market", "Growth Strategy", "Digital Planning"],
    image: "/images/expertise-strategy.jpg",
    image2: "/images/industry-b2b.jpg", // SAMPLE: second image for this service
  },
  {
    title: "Entertainment & PR",
    tags: ["Film Marketing", "Events", "Influencer Campaigns", "Digital PR"],
    image: "/images/expertise-entertainment.jpg",
    image2: "/images/media-event.jpg", // SAMPLE: second image for this service
  },
];

export const industries = [
  {
    title: "Healthcare",
    items: ["Hospitals", "Clinics", "Healthcare Brands"],
    image: "/images/industry-healthcare.jpg",
  },
  {
    title: "Education",
    items: ["Preschools", "Educational Products", "Institutions"],
    image: "/images/industry-education.jpg",
  },
  {
    title: "Entertainment",
    items: ["Films", "OTT", "Artists", "Events"],
    image: "/images/industry-entertainment.jpg",
  },
  {
    title: "Consumer Brands",
    items: ["Beauty", "Wellness", "Food", "Lifestyle"],
    image: "/images/industry-consumer.jpg",
  },
  {
    title: "B2B & Corporate",
    items: ["Professional Services", "B2B Brands", "Corporate"],
    image: "/images/industry-b2b.jpg",
  },
  {
    title: "D2C & E-Commerce",
    items: ["Consumer Products", "Digital-first Brands"],
    image: "/images/industry-d2c.jpg",
  },
];

// SAMPLE gallery pool for the Work folders. Replace each work's `gallery` with
// real campaign images (14 per project fills the grid).
const galleryPool = [
  "about-studio",
  "expertise-content",
  "expertise-creative",
  "expertise-entertainment",
  "expertise-performance",
  "expertise-social",
  "expertise-strategy",
  "industry-b2b",
  "industry-consumer",
  "industry-d2c",
  "industry-education",
  "industry-entertainment",
  "industry-healthcare",
  "media-event",
  "media-podcast",
  "media-talk",
  "team",
  "hero",
].map((n) => `/images/${n}.jpg`);
const sampleGallery = (offset: number) =>
  Array.from({ length: 14 }, (_, k) => galleryPool[(offset + k) % galleryPool.length]);

// TODO: link each card to a full case study once written
export const work = [
  {
    category: "Healthcare",
    client: "HearFon Audiology",
    summary: "Digital awareness + lead generation + regional content strategy.",
    services: ["Lead Generation", "Regional Content", "Awareness"],
    image: "/images/work-hearfon.jpg",
    gallery: sampleGallery(0),
  },
  {
    category: "Education",
    client: "Littlekidz / Lilbeez",
    summary: "Admissions + franchise + digital growth campaigns.",
    services: ["Admissions", "Franchise Growth", "Performance"],
    image: "/images/work-littlekidz.jpg",
    gallery: sampleGallery(4),
  },
  {
    category: "Consumer",
    client: "Kovedaa",
    summary: "Beauty & skincare brand launch + influencer + performance strategy.",
    services: ["Brand Launch", "Influencer", "Performance"],
    image: "/images/work-kovedaa.jpg",
    gallery: sampleGallery(8),
  },
  {
    category: "Entertainment",
    client: "Film & Entertainment Campaigns",
    summary: "Digital campaigns, influencer outreach, event amplification & audience building.",
    services: ["Film Marketing", "Influencer Outreach", "Events"],
    image: "/images/work-entertainment.jpg",
    gallery: sampleGallery(12),
  },
];

export const approach = [
  { step: "Understand", detail: "Business, audience & market" },
  { step: "Create", detail: "Content, campaigns & creative ideas" },
  { step: "Distribute", detail: "Meta | Google | YouTube | Social | Digital" },
  { step: "Optimize", detail: "Data → Insights → Performance → Growth" },
];

// SAMPLE images per spotlight category — replace with real press photos.
export const spotlight = [
  { title: "Media Features", image: "/images/about-studio.jpg" },
  { title: "Founder Interviews", image: "/images/media-talk.jpg" },
  { title: "Podcasts", image: "/images/media-podcast.jpg" },
  { title: "Industry Talks", image: "/images/expertise-strategy.jpg" },
  { title: "Brand Announcements", image: "/images/expertise-creative.jpg" },
  { title: "Campaign Highlights", image: "/images/expertise-content.jpg" },
  { title: "Awards & Recognition", image: "/images/industry-entertainment.jpg" },
  { title: "Events & Collaborations", image: "/images/media-event.jpg" },
];

// TODO: replace with real media/publication logos
export const featuredIn = ["Media Logo", "Podcast", "Publication", "Event", "Brand"];

export const founderVoice = {
  eyebrow: "Founder's Voice",
  tagline: "A strong PR element.",
  heading: "What We Believe",
  quote:
    "The future of marketing isn't about being everywhere. It's about being relevant where your audience is paying attention.",
  by: "Phani Srivatsa & Sathwik NJ",
  sub: "Sripada Studios",
};

export const quotes = [
  {
    text: founderVoice.quote,
    by: founderVoice.by,
  },
];

export type Milestone = {
  phase: string;
  badge?: string;
  detail: string;
  tagline: string;
  quote: string;
  isCurrent?: boolean;
};

// TODO: confirm actual dates for each milestone
export const milestones: Milestone[] = [
  {
    phase: "2019 / Beginning",
    tagline: "Founding Vision",
    quote: "“Creative instinct”",
    detail: "The vision behind Sripada Studios.",
  },
  {
    phase: "Growth Phase",
    tagline: "Team Expansion",
    quote: "“Creative & performance”",
    detail: "Building teams across creative, social media & performance.",
  },
  {
    phase: "20+ Clients",
    tagline: "Cross-Industry",
    quote: "“Measurable ROI”",
    detail: "Performance marketing across multiple industries.",
  },
  {
    phase: "Healthcare Expansion",
    tagline: "Healthcare Focus",
    quote: "“Healthcare trust”",
    detail: "Building expertise across hospitals, clinics & healthcare brands.",
  },
  {
    phase: "Entertainment & IPs",
    tagline: "Cinema & Culture",
    quote: "“Films, creators & IPs”",
    detail: "Expanding into films, entertainment, influencers & original IPs.",
  },
  {
    phase: "Today",
    badge: "Now",
    tagline: "Next-Gen Era",
    quote: "“Digital-first leaders”",
    detail: "Building the next generation of digital-first brands.",
    isCurrent: true,
  },
];

export const teams = [
  "Performance Marketing",
  "Social Media",
  "Creative & Design",
  "Video Production",
  "Content",
  "Business & Strategy",
  "HR & Talent",
];

// TODO: replace with 15–25 real client logos (SVG in /public/logos)
export const clients = [
  "HearFon",
  "Littlekidz",
  "Lilbeez",
  "Kovedaa",
  "Client 05",
  "Client 06",
  "Client 07",
  "Client 08",
  "Client 09",
  "Client 10",
  "Client 11",
  "Client 12",
];

export const clientCategories = [
  "Healthcare",
  "Education",
  "Entertainment",
  "Consumer",
  "B2B",
  "D2C",
];

export const reasons = [
  "Strategy + Execution",
  "Creative + Performance",
  "Content + Distribution",
  "Data + Human Insights",
  "In-house Teams",
  "Multi-industry Experience",
  "Performance-led Marketing",
];
