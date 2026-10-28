// All copy for the single-page site lives here so it can be edited without
// touching layout code. Items marked TODO need real data/assets from the team.
// Images in /public/images are SAMPLE stock photos: replace each file with a real
// one under the same name (or update the path here).

export const site = {
  name: "Sripada Studios",
  url: "https://sripadastudios.com/",
  tagline: "Connecting Iconic Brands with Cultural Events & Cinematic Media.",
  headline:
    "Sripada Studios is the ultimate event & digital partner bridging brands, high-visibility IP festivals, and top-tier content creation.",
  location: "Bengaluru",
  heroImage: "/images/hero.jpg",
  aboutImage: "/images/about-studio.jpg",
  teamImage: "/media/team/teams.webp",
  // TODO: confirm public contact details
  contact: {
    // One row per founder in the contact section; enquiries go to both.
    people: [
      {
        name: "Phani Srivatsa",
        email: "phanisrivatsa@sripadastudios.com",
        phone: "+91 90608 70117",
      },
      {
        name: "Sathwik NJ",
        email: "sathwiknj@sripadastudios.in",
        phone: "+91 88841 48055",
      },
    ],
    address:
      "No:4/2, 1st, Chord Rd, Rajaji Nagar Industrial Town, Rajajinagar, Bengaluru, Karnataka 560010",
  },
  // Hero calls to action, one per audience.
  // TODO: point each at its own form or page once they exist.
  heroCtas: [
    { audience: "For Brands", label: "Sponsor an Event", href: "#contact" },
    { audience: "For Event Creators / Partners", label: "Collaborate with Us", href: "#contact" },
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/sripada-studios/" },
    { label: "Instagram", href: "https://www.instagram.com/sripadastudios/" },
    { label: "YouTube", href: "https://www.youtube.com/@SRIPADASTUDIOS" },
  ],
};

export const nav = [
  { label: "Value Proposition", href: "#value-proposition" },
  { label: "Sponsor", href: "#flagship" },
  { label: "Case Study", href: "#sripada-case-study" },
  { label: "Founders", href: "#founders" },
  { label: "Integrations", href: "#brand-integrations" },
  { label: "Contact", href: "#contact" },
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
  /** Portrait with the background removed (transparent), for the founder cards. */
  cutout: string;
  profileHref: string;
};

export const founders: Founder[] = [
  {
    name: "Phani Srivatsa",
    initials: "PS",
    role: "Founder & Strategist",
    bio: "Founder Phani Srivatsa, Strategist.",
    points: [
      "Entrepreneur & Digital Business Leader",
      "Creative & Brand Strategy",
      "Business Development",
      "Client & Brand Relationships",
      "Building teams and creative ecosystems",
    ],
    image: "/images/phani.webp",
    imagePosition: "object-[center_25%]",
    cutout: "/images/founders/phani-soft-cutout.webp",
    profileHref: "#contact", // TODO: link to full profile
  },
  {
    name: "Sathwik NJ",
    initials: "SN",
    role: "Co-Founder",
    bio: "Co-Founder Sathwik NJ.",
    points: [
      "6+ Years in Performance Marketing & Strategy",
      "80+ Clients",
      "E-commerce | B2B | B2C",
      "Performance Marketing",
      "Team Building & Business Strategy",
    ],
    image: "/images/team-satwik.jpg",
    imagePosition: "object-[center_10%]",
    cutout: "/images/founders/sathwik-cutout.webp",
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
    category: "Entertainment & Film",
    client: "America America 2 (AA2)",
    summary: "Star cast press launch, media strategy & regional promotion campaign.",
    description:
      "For director Nagathihalli Chandrashekhar's America America 2 (AA2) starring Nirup Bhandari and Shanvi Srivastava, we spearheaded the official press launch and digital media strategy — driving widespread regional coverage, entertainment portal syndication, and high-engagement social buzz across Karnataka.",
    services: ["Film Marketing", "Press & PR", "Social Buzz"],
    // Opens as a full case study when the card is clicked.
    caseStudy: {
      label: "America America 2 · Film Marketing",
      headline: [
        { text: "We ran the" },
        { text: "complete", highlight: "violet" as const },
        { text: "movie marketing", highlight: "teal" as const },
        { text: "for AA2." },
      ],
      intro:
        "For director Nagathihalli Chandrashekhar's America America 2, starring Nirup Bhandari and Shanvi Srivastava, we handled the film's marketing end to end — from the first poster to packed theatres.",
      services: [
        "Complete movie marketing",
        "Poster designs & printables",
        "Promotions & viral marketing",
        "Theatre visits",
        "Audience visits, capturing real reactions",
        "Event coverage",
        "Audio launch",
        "Pre & post production",
        "Performance marketing",
        "Driving theatre footfalls",
      ],
      note: "From the first poster to a full house, every step handled in-house.",
      poster: "/AA2/AA2%20-%20DESIGNS.png",
    },
    image: "/AA2/AA2%20-%20DESIGNS.png",
    // Tall 9:16 poster: crop toward the top so the title stays in the 4:5 card.
    imagePosition: "object-[center_20%]",
    gallery: filmsGallery,
  },
  {
    category: "Healthcare & CSR",
    client: "Aanya Hospital",
    summary: "World Cancer Day awareness camp, doctor spotlights & screening drives.",
    description:
      "To mark World Cancer Day, we partnered with Aanya Hospital to drive local community outreach for their cancer screening & oncology health camp. Combining digital registration drives, local doctor spotlights, and empathetic awareness messaging, the campaign mobilized hundreds of patients for preventative screenings.",
    services: ["Healthcare Outreach", "Camp Awareness", "Lead Funnel"],
    // Shown as how we work with every hospital and healthcare brand.
    caseStudy: {
      label: "Aanya Hospital · Healthcare",
      headline: [
        { text: "We market" },
        { text: "hospitals", highlight: "violet" as const },
        { text: "end to end,", highlight: "teal" as const },
        { text: "like Aanya." },
      ],
      intro:
        "From Aanya Hospital's World Cancer Day screening camp to everyday patient outreach, this is how we work with every hospital and healthcare brand: one team for production, awareness and growth.",
      services: [
        "Photo & video production",
        "Health & awareness camps",
        "Performance marketing",
        "Social media management",
        "Graphic design",
        "Web development",
        "Video editing",
      ],
      note: "One team for every hospital brand, from the camp to the clinic's feed.",
      poster: "/aanya%20camp/SSD_9365.jpg",
    },
    image: "/aanya%20camp/SSD_9365.jpg",
    gallery: hearfonGallery,
  },
  {
    category: "Education & Training",
    client: "Lil Beez",
    summary: "Teacher's Success Training 2026, educator summits & curriculum launch.",
    description:
      "Empowering educators across early childhood institutions, the Lil Beez Teacher's Success Training summit brought together teachers, school leaders, and early childhood specialists. We produced video highlights, event documentation, and digital outreach to spotlight early childhood education leadership.",
    services: ["Teacher Training", "Video Production", "Curriculum PR"],
    // Shown as how we work with every school and education brand.
    caseStudy: {
      label: "Lil Beez · Education",
      headline: [
        { text: "We grow" },
        { text: "education", highlight: "violet" as const },
        { text: "brands,", highlight: "teal" as const },
        { text: "like Lil Beez." },
      ],
      intro:
        "From the Lil Beez Teacher's Success Training 2026 summit to year-round admissions campaigns, this is how we work with every school and education brand: one team for production, outreach and growth.",
      services: [
        "Photo & video production",
        "Event & training coverage",
        "Performance marketing",
        "Social media management",
        "Graphic design",
        "Web development",
        "Video editing",
      ],
      note: "One team for every education brand, from the classroom to the campaign.",
      poster: "/Lil%20Beez/frame-0-00.jpg",
    },
    // Very first frame (0:00) of the training highlights video.
    image: "/Lil%20Beez/frame-0-00.jpg",
    gallery: littlekidzGallery,
  },
  {
    category: "B2B & Events",
    client: "Ascent Lifts & Escalators",
    summary: "ACETECH 2026 3-day expo highlights, VIP delegation & brand amplification.",
    description:
      "For Ascent Lifts & Escalators at ACETECH 2026, we delivered end-to-end on-ground event coverage, social-first highlight reels, and executive brand amplification — capturing the grandeur of their pavilion, high-profile VIP walk-throughs, and industry buzz across architecture and construction networks.",
    services: ["Event Coverage", "Highlight Reels", "B2B Branding"],
    // Shown as how we cover every corporate and B2B event.
    caseStudy: {
      label: "Ascent Lifts & Escalators · ACETECH 2026",
      headline: [
        { text: "Corporate" },
        { text: "events,", highlight: "violet" as const },
        { text: "delivered", highlight: "teal" as const },
        { text: "the same day." },
      ],
      intro:
        "At ACETECH 2026 we covered Ascent Lifts & Escalators across all three days. This is how we handle every corporate and B2B event: we shoot, edit and deliver within the same day, so the buzz goes live while the event is still on.",
      services: [
        "End-to-end event coverage",
        "Same-day highlight reels",
        "Photo & video production",
        "VIP & delegation coverage",
        "Social media posting",
        "Graphic design",
        "B2B brand amplification",
      ],
      note: "Shot, edited and delivered within the same day, every day of the event.",
      poster: "/asceent/frame-0-05.jpg",
    },
    // Frame grabbed at 0:05 of the 3-day highlights reel.
    image: "/asceent/frame-0-05.jpg",
    gallery: kovedaaGallery,
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
    phase: "80+ Clients",
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
  {
    name: "Samrat Restaurant & Party Hall",
    logo: "/clients/samrat-restaurant-party-hall.png?v=3",
    width: 64,
    height: 38,
  },
  {
    name: "Chaitanya Convention Centre",
    logo: "/clients/chaitanya-convention-centre.png?v=3",
    width: 66,
    height: 54,
  },
  {
    name: "Aryamba Fertility & Research Center",
    logo: "/clients/aryamba-fertility-research-center.png?v=3",
    width: 65,
    height: 55,
  },
  { name: "Lil Beez", logo: "/clients/lil-beez.png?v=3", width: 89, height: 40 },
  {
    name: "Action Cut Entertainments",
    logo: "/clients/action-cut-entertainments.png?v=3",
    width: 53,
    height: 69,
  },
  { name: "Kovedaa", logo: "/clients/kovedaa.png?v=3", width: 58, height: 62 },
  {
    name: "The Copper Edge Eco Resort",
    logo: "/clients/the-copper-edge-eco-resort.png?v=3",
    width: 74,
    height: 49,
  },
  { name: "HearFon", logo: "/clients/hearfon.png?v=3", width: 118, height: 30 },
  { name: "Skill Incarnate", logo: "/clients/skill-incarnate.png?v=3", width: 129, height: 28 },
  { name: "Tent Cinema", logo: "/clients/tent-cinema.png?v=3", width: 62, height: 58 },
  { name: "Mahira's", logo: "/clients/mahira-s.png?v=3", width: 100, height: 36 },
  { name: "Aikyam Weddings", logo: "/clients/aikyam-weddings.png?v=3", width: 59, height: 61 },
  { name: "WMN Doctors", logo: "/clients/wmn-doctors.png?v=3", width: 99, height: 36 },
  {
    name: "Nirguna Acting School",
    logo: "/clients/nirguna-acting-school.png?v=3",
    width: 49,
    height: 49,
  },
  { name: "NKR TV", logo: "/clients/nkr-tv.png?v=3", width: 73, height: 49 },
  { name: "Nourishing Bites", logo: "/clients/nourishing-bites.png?v=3", width: 120, height: 30 },
  {
    name: "Neferrtiti Weddings",
    logo: "/clients/neferrtiti-weddings.png?v=3",
    width: 53,
    height: 68,
  },
  {
    name: "Sripada Multispeciality Hospital",
    logo: "/clients/sripada-multispeciality-hospital.png?v=3",
    width: 124,
    height: 29,
  },
  { name: "Angola Academy", logo: "/clients/angola-academy.png?v=3", width: 118, height: 30 },
  { name: "Total Kannada", logo: "/clients/total-kannada.png?v=3", width: 68, height: 53 },
  { name: "Samrat Residency", logo: "/clients/samrat-residency.png?v=3", width: 104, height: 35 },
  {
    name: "Kalpavriksha Wedding Venue",
    logo: "/clients/kalpavriksha-wedding-venue.png?v=3",
    width: 113,
    height: 32,
  },
  { name: "Tara Dental", logo: "/clients/tara-dental.png?v=3", width: 59, height: 61 },
  { name: "G Academy", logo: "/clients/g-academy.png?v=3", width: 94, height: 38 },
  { name: "G9", logo: "/clients/g9.png?v=3", width: 49, height: 49 },
  {
    name: "Sri Chakra Pearls & Jewellery",
    logo: "/clients/sri-chakra-pearls-jewellery.png?v=3",
    width: 65,
    height: 55,
  },
  {
    name: "Abhani Health and Daycare Centre",
    logo: "/clients/abhani-health-and-daycare-centre.png?v=3",
    width: 109,
    height: 33,
  },
  { name: "BodhiAble", logo: "/clients/bodhiable.png?v=3", width: 93, height: 39 },
  { name: "Suraj Production", logo: "/clients/suraj-production.png?v=3", width: 107, height: 34 },
  { name: "Wisden Clinics", logo: "/clients/wisden-clinics.png?v=3", width: 140, height: 26 },
  {
    name: "Hello Ramesh Speaking",
    logo: "/clients/hello-ramesh-speaking.png?v=3",
    width: 94,
    height: 38,
  },
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
