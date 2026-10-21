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
  // TODO: swap for a scheduling link (e.g. Calendly) once available
  bookCallHref: "#contact",
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
  imagePosition?: string;
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
    image: "/images/phani.webp",
    imagePosition: "object-[center_25%]",
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
    image: "/images/team-satwik.jpg",
    imagePosition: "object-[center_10%]",
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

// Each industry shows a tile cluster around the Sripada mark, with two tags.
// Six tiles: top-left, top-right, mid-left, mid-right, bottom-left, bottom-right.
// Up to three tiles form a triangle (top-left, mid-right, bottom-left), four a "Z"
// (top-left, mid-left, mid-right, bottom-right); more than
// six switch to a wider 4-2-4 layout (read left → right, top → bottom).
// Tiles from a `…-logos/` folder show whole on white; anything else is cropped like a photo.
export type Industry = {
  title: string;
  items: string[];
  tags: [string, string];
  tiles: string[];
};

export const industries: Industry[] = [
  {
    title: "Education",
    items: ["Preschools", "Educational Products", "Institutions"],
    tags: ["Preschools", "Institutions"],
    tiles: [
      "/media/education-logos/little-kidz.png",
      "/media/education-logos/nirguna-acting-school.png",
      "/media/education-logos/lilbeez.png",
      "/media/education-logos/skill-incarnate.png",
    ],
  },
  {
    title: "Healthcare",
    items: ["Hospitals", "Clinics", "Healthcare Brands"],
    tags: ["Hospitals", "Clinics"],
    tiles: [
      "/media/healthcare-logos/hearfon.png",
      "/media/healthcare-logos/aanya-hospitals.png",
      "/media/healthcare-logos/aryamba.png",
      "/media/healthcare-logos/wmn-doctors.png",
      "/media/healthcare-logos/sripada-hospital.png",
      "/media/healthcare-logos/tara-dental.png",
      "/media/healthcare-logos/abhani.png",
      "/media/healthcare-logos/wisden-clinics.png",
      "/media/healthcare-logos/fitness-factory.png",
    ],
  },
  {
    title: "Entertainment",
    items: ["Films", "OTT", "Artists", "Events"],
    tags: ["Films", "Events"],
    tiles: [
      "/media/entertainment-logos/g-cinemas.png",
      "/media/entertainment-logos/action-cut-entertainments.png",
      "/media/entertainment-logos/tent-cinema.png",
      "/media/entertainment-logos/nkr-tv.png",
      "/media/entertainment-logos/total-kannada.png",
      "/media/entertainment-logos/g9.png",
      "/media/entertainment-logos/suraj-production.png",
      "/media/entertainment-logos/hello-ramesh-speaking.png",
    ],
  },
  {
    title: "Consumer Brands",
    items: ["Beauty", "Wellness", "Food", "Lifestyle"],
    tags: ["Food", "Wellness"],
    tiles: [
      "/media/consumer-logos/samrat.png",
      "/media/consumer-logos/nourishing-bites.png",
      "/media/consumer-logos/mahiras.png",
      "/media/consumer-logos/kovedaa.png",
    ],
  },
  {
    title: "B2B & Corporate",
    items: ["Professional Services", "B2B Brands", "Corporate"],
    tags: ["B2B Brands", "Corporate"],
    // TODO: swap these stock photos for real B2B client creatives
    tiles: [
      "/images/industry-b2b.jpg",
      "/images/expertise-strategy.jpg",
      "/images/team.jpg",
      "/images/media-talk.jpg",
      "/images/about-studio.jpg",
      "/images/expertise-performance.jpg",
    ],
  },
  {
    title: "D2C & E-Commerce",
    items: ["Consumer Products", "Digital-first Brands"],
    tags: ["Skincare", "D2C"],
    tiles: [
      "/media/kovedaa/kovedaa-designs-1.webp",
      "/media/kovedaa/cc-03.webp",
      "/media/kovedaa/kovedaa-designs-2.webp",
      "/media/kovedaa/cc-05.webp",
      "/media/kovedaa/kovedaa-designs-5.webp",
      "/media/kovedaa/kovedaa-designs-3.webp",
    ],
  },
];

// Work folder galleries: 15 images fill the grid (5 columns × 3); fewer wrap round.
// HearFon creatives, column by column (3 per column); middle row is the most visible.
const hearfonGallery = [
  "/media/hearfon/23-01-2026.webp",
  "/media/hearfon/28-01-2026.webp",
  "/media/hearfon/hf-05-12-2025.webp",
  "/media/hearfon/hf-cc-01.webp",
  "/media/hearfon/hf-october-2.webp",
  "/media/hearfon/hf-cc-07.webp",
  "/media/hearfon/10-01-2026.webp",
  "/media/hearfon/cc-01.webp",
  "/media/hearfon/hf-october-1.webp",
  "/media/hearfon/hf-08-12-2025.webp",
  "/media/hearfon/hf-october-4.webp",
  "/media/hearfon/hf-october.webp",
  "/media/hearfon/hf-october-3.webp",
  "/media/hearfon/hf-cc-07-1.webp",
];

// Littlekidz / Lilbeez creatives, same column-by-column layout; brands alternate.
const littlekidzGallery = [
  "/media/littlekidz/01.webp",
  "/media/littlekidz/lk-2026-1.webp",
  "/media/littlekidz/cc-03.webp",
  "/media/littlekidz/lk-cc-01.webp",
  "/media/littlekidz/cc-01-2.webp",
  "/media/littlekidz/lk-cc-04.webp",
  "/media/littlekidz/lb-april-1080-x-1350-px-1.webp",
  "/media/littlekidz/lk-2026.webp",
  "/media/littlekidz/lb-cc-12.webp",
  "/media/littlekidz/lk-cc-15.webp",
  "/media/littlekidz/lk-cc-02-1.webp",
  "/media/littlekidz/lb-april-1080-x-1350-px.webp",
  "/media/littlekidz/cc-05.webp",
  "/media/littlekidz/lk-cc-05.webp",
];

// Kovedaa creatives, same column-by-column layout.
const kovedaaGallery = [
  "/media/kovedaa/kovedaa-designs-2.webp",
  "/media/kovedaa/cc-01-1.webp",
  "/media/kovedaa/cc-05.webp",
  "/media/kovedaa/cc-03.webp",
  "/media/kovedaa/kovedaa-designs-1.webp",
  "/media/kovedaa/kovedaa-designs-5.webp",
  "/media/kovedaa/kovedaa-designs-3.webp",
  "/media/kovedaa/kovedaa-designs-4.webp",
  "/media/kovedaa/kovedaa-designs-6.webp",
  "/media/kovedaa/kovedaa-designs-1080-x-1920-px.webp",
  "/media/kovedaa/kovedaa-designs.webp",
  "/media/kovedaa/cc-07.webp",
  "/media/kovedaa/carousel-03-18-06-2026.webp",
];

// Film & entertainment posters, same column-by-column layout.
const filmsGallery = [
  "/media/films/mk.webp",
  "/media/films/45.webp",
  "/media/films/dm-mn-ad-02.webp",
  "/media/films/jd.webp",
  "/media/films/lm.webp",
  "/media/films/trailer-out-now-poster.webp",
  "/media/films/sf-2.webp",
  "/media/films/ui.webp",
  "/media/films/pentagon.webp",
  "/media/films/kaalapathar.webp",
  "/media/films/sf.webp",
  "/media/films/jd-2.webp",
  "/media/films/dm.webp",
  "/media/films/ap.webp",
  "/media/films/tt.webp",
];

// TODO: link each card to a full case study once written
export const work = [
  {
    category: "Healthcare",
    client: "HearFon Audiology",
    summary: "Digital awareness + lead generation + regional content strategy.",
    description:
      "Hearing loss is easy to ignore until it isn't. We made hearing care feel approachable for HearFon with empathetic, family-first campaigns, Kannada-first regional content that speaks to local audiences, and lead-generation funnels that turn awareness into booked hearing consultations at HearFon clinics.",
    services: ["Lead Generation", "Regional Content", "Awareness"],
    image: "/media/hearfon/hf-october-2.webp",
    gallery: hearfonGallery,
  },
  {
    category: "Education",
    client: "Littlekidz / Lilbeez",
    summary: "Admissions + franchise + digital growth campaigns.",
    description:
      "Two sister brands, one growth story. For Little Kidz Preschool we run admission-season campaigns that answer parents' real questions, while Lilbeez showcases its learning books and teacher-training programmes to schools and educators. Franchise-focused outreach ties it together, building trust and expanding the network.",
    services: ["Admissions", "Franchise Growth", "Performance"],
    image: "/media/littlekidz/lk-cc-02-1.webp",
    gallery: littlekidzGallery,
  },
  {
    category: "Consumer",
    client: "Kovedaa",
    summary: "Beauty & skincare brand launch + influencer + performance strategy.",
    description:
      "Kovedaa entered a crowded skincare market with body care made simple. We shaped the launch end to end: ingredient-led storytelling that makes the products easy to understand, influencer collaborations that show real routines, and performance campaigns built to drive combos and repeat purchases.",
    services: ["Brand Launch", "Influencer", "Performance"],
    image: "/media/kovedaa/kovedaa-designs.webp",
    gallery: kovedaaGallery,
  },
  {
    category: "Entertainment",
    client: "Film & Entertainment Campaigns",
    summary: "Digital campaigns, influencer outreach, event amplification & audience building.",
    description:
      "From release buzz to packed venues, we help films and entertainment brands find their audience. Digital campaigns build anticipation, influencer outreach reaches deep into fan communities, and on-ground events are amplified online to keep the conversation going long after the day.",
    services: ["Film Marketing", "Influencer Outreach", "Events"],
    image: "/media/films/ui.webp",
    gallery: filmsGallery,
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

// Logos in /public/clients are trimmed copies of /public/Client Logos, shown on the cream background.
// width/height = optically balanced display size in px.
export const clients = [
  { name: "Aanya Hospitals", logo: "/clients/aanya-hospitals.png?v=3", width: 91, height: 39 },
  { name: "Little Kidz", logo: "/clients/little-kidz.png?v=3", width: 62, height: 58 },
  { name: "G Cinemas", logo: "/clients/g-cinemas.png?v=3", width: 84, height: 43 },
  { name: "Samrat Restaurant & Party Hall", logo: "/clients/samrat-restaurant-party-hall.png?v=3", width: 64, height: 38 },
  { name: "Chaitanya Convention Centre", logo: "/clients/chaitanya-convention-centre.png?v=3", width: 66, height: 54 },
  { name: "Aryamba Fertility & Research Center", logo: "/clients/aryamba-fertility-research-center.png?v=3", width: 65, height: 55 },
  { name: "Lil Beez", logo: "/clients/lil-beez.png?v=3", width: 89, height: 40 },
  { name: "Action Cut Entertainments", logo: "/clients/action-cut-entertainments.png?v=3", width: 53, height: 69 },
  { name: "Kovedaa", logo: "/clients/kovedaa.png?v=3", width: 58, height: 62 },
  { name: "The Copper Edge Eco Resort", logo: "/clients/the-copper-edge-eco-resort.png?v=3", width: 74, height: 49 },
  { name: "HearFon", logo: "/clients/hearfon.png?v=3", width: 118, height: 30 },
  { name: "Skill Incarnate", logo: "/clients/skill-incarnate.png?v=3", width: 129, height: 28 },
  { name: "Tent Cinema", logo: "/clients/tent-cinema.png?v=3", width: 62, height: 58 },
  { name: "Mahira's", logo: "/clients/mahira-s.png?v=3", width: 100, height: 36 },
  { name: "Aikyam Weddings", logo: "/clients/aikyam-weddings.png?v=3", width: 59, height: 61 },
  { name: "WMN Doctors", logo: "/clients/wmn-doctors.png?v=3", width: 99, height: 36 },
  { name: "Nirguna Acting School", logo: "/clients/nirguna-acting-school.png?v=3", width: 49, height: 49 },
  { name: "NKR TV", logo: "/clients/nkr-tv.png?v=3", width: 73, height: 49 },
  { name: "Nourishing Bites", logo: "/clients/nourishing-bites.png?v=3", width: 120, height: 30 },
  { name: "Neferrtiti Weddings", logo: "/clients/neferrtiti-weddings.png?v=3", width: 53, height: 68 },
  { name: "Sripada Multispeciality Hospital", logo: "/clients/sripada-multispeciality-hospital.png?v=3", width: 124, height: 29 },
  { name: "Angola Academy", logo: "/clients/angola-academy.png?v=3", width: 118, height: 30 },
  { name: "Total Kannada", logo: "/clients/total-kannada.png?v=3", width: 68, height: 53 },
  { name: "Samrat Residency", logo: "/clients/samrat-residency.png?v=3", width: 104, height: 35 },
  { name: "Kalpavriksha Wedding Venue", logo: "/clients/kalpavriksha-wedding-venue.png?v=3", width: 113, height: 32 },
  { name: "Tara Dental", logo: "/clients/tara-dental.png?v=3", width: 59, height: 61 },
  { name: "G Academy", logo: "/clients/g-academy.png?v=3", width: 94, height: 38 },
  { name: "G9", logo: "/clients/g9.png?v=3", width: 49, height: 49 },
  { name: "Sri Chakra Pearls & Jewellery", logo: "/clients/sri-chakra-pearls-jewellery.png?v=3", width: 65, height: 55 },
  { name: "Abhani Health and Daycare Centre", logo: "/clients/abhani-health-and-daycare-centre.png?v=3", width: 109, height: 33 },
  { name: "BodhiAble", logo: "/clients/bodhiable.png?v=3", width: 93, height: 39 },
  { name: "Suraj Production", logo: "/clients/suraj-production.png?v=3", width: 107, height: 34 },
  { name: "Wisden Clinics", logo: "/clients/wisden-clinics.png?v=3", width: 140, height: 26 },
  { name: "Hello Ramesh Speaking", logo: "/clients/hello-ramesh-speaking.png?v=3", width: 94, height: 38 },
  { name: "Fitness Factory", logo: "/clients/fitness-factory.png?v=3", width: 116, height: 31 },
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
