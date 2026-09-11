// ============================================================
// SITE CONFIG — edit this one file to make the site yours.
// Values marked PLACEHOLDER should be replaced with real ones.
// ============================================================

export const site = {
  // --- You (Agency Name) ---
  name: "Cabin and Code",
  role: "web studio",
  location: "India",

  // --- Contact (PLACEHOLDER values — swap in your real ones) ---
  email: "hello@cabinandcode.com",
  whatsapp: "919220472008", // country code + number, digits only (no +, spaces or dashes)
  whatsappDisplay: "+91 9220472008", // how the number appears on screen

  // Derived from `whatsapp` — don't edit, it stays in sync automatically
  get whatsappLink() {
    return `https://wa.me/${this.whatsapp}`;
  },

  // --- Fiverr (PLACEHOLDER — replace YOUR_FIVERR_USERNAME) ---
  fiverrUrl: "https://www.fiverr.com/your_fiverr_username",
  fiverrHandle: "cabinandcode",

  // --- Availability status shown next to the green dot ---
  availability: "available for new projects",

  // --- Hero copy ---
  heroTitle: "websites that bring in customers.",
  heroIntro:
    "we design and ship clean, fast, affordable sites for businesses — and we handle everything end-to-end, so you don't have to.",
  heroNote: "usually replies within a few hours",

  // --- Statement band ---
  statement: "A good website does not need to shout. It needs to bring customers.",

  // --- Socials (empty strings are hidden automatically) ---
  githubUrl: "",
  linkedinUrl: "",
} as const;

// ============================================================
// Services — shown as a numbered ledger. Written as outcomes,
// not jargon, so a business owner instantly gets it.
// ============================================================
export const services = [
  {
    title: "business websites",
    tag: "turnkey 5-page site",
    description:
      "up to 5 pages — home, services, about, gallery, contact. looks sharp on phones, tablets and computers.",
  },
  {
    title: "google search basics",
    tag: "seo & indexing",
    description:
      "your site set up so google can find it: page titles, descriptions, sitemap and indexing. not magic — just done properly.",
  },
  {
    title: "whatsapp & maps integration",
    tag: "1-tap leads",
    description:
      "a whatsapp button that opens a chat with you in one tap, plus your location embedded so customers can find your door.",
  },
  {
    title: "domain & hosting setup",
    tag: "100% ownership",
    description:
      "yourname.com bought, connected and hosted — handled end to end. you own everything, nothing is locked to me.",
  },
  {
    title: "updates after launch",
    tag: "flat & transparent",
    description:
      "small changes — prices, photos, hours — done quickly at flat, student-friendly rates. no retainers, no surprises.",
  },
] as const;

// ============================================================
// Process — 4 steps
// ============================================================
export const processSteps = [
  {
    step: "01",
    title: "free chat",
    description:
      "we talk about your business and what you need — on whatsapp or a call. i tell you straight what will help and what it costs.",
  },
  {
    step: "02",
    title: "design preview",
    description:
      "you see how your website will look before i build it. changes are easy here — this is where we get it right.",
  },
  {
    step: "03",
    title: "build & review",
    description:
      "i build the real site and share a private preview link. you go through everything and tell me what to fix.",
  },
  {
    step: "04",
    title: "launch & support",
    description:
      "your site goes live on your domain. after launch, small updates stay quick and affordable.",
  },
] as const;

// ============================================================
// Featured Projects (Working Concept Demos for prospective clients)
// ============================================================
export interface FeaturedProject {
  id: string;
  category: string;
  tag: string;
  title: string;
  intro: string;
  domain: string;
  badge: string;
  accent: string;
  headline: string;
  subhead: string;
  menu: readonly {
    item: string;
    detail?: string;
    price: string;
  }[];
  reviews: readonly {
    stars: number;
    author: string;
    text: string;
  }[];
  demonstrates: readonly string[];
}

export const featuredProjects: readonly FeaturedProject[] = [
  {
    id: "studio-aura",
    category: "salon & aesthetics",
    tag: "live demo · salon",
    title: "studio aura — luxury salon & aesthetics",
    intro:
      "built for appointment-based local salons: interactive price menu, instant whatsapp booking, real customer reviews, and open hours.",
    domain: "studioaura.in",
    badge: "open today · 9:00 am – 8:00 pm",
    accent: "#0f766e",
    headline: "look good. get found. stay booked.",
    subhead: "walk-ins welcome & appointments prioritized. open all 7 days.",
    menu: [
      { item: "haircut & styling", detail: "signature wash, custom cut & blow dry", price: "₹299" },
      { item: "beard trim & shape", detail: "precision edging, oil treatment & massage", price: "₹199" },
      { item: "hair spa & deep repair", detail: "keratin treatment & relaxing steam massage", price: "₹699" },
      { item: "hydrating facial & cleanup", detail: "exfoliation, detox mask & glow serum", price: "₹599" },
    ],
    reviews: [
      { stars: 5, author: "Vikram R.", text: "best haircut in the area, been coming for two years. booked on whatsapp with zero waiting." },
      { stars: 5, author: "Sneha M.", text: "flawless bridal glow facial and styling. super professional team." },
    ],
    demonstrates: [
      "1-tap whatsapp booking button that lands right in your chat",
      "transparent services & price list readable on any screen",
      "google reviews & 5-star customer trust blocks",
      "operating hours with live 'open today' status",
      "ultra-fast mobile loading for local customers on 4G/5G",
    ],
  },
  {
    id: "roast-and-bloom",
    category: "artisan cafe & bakery",
    tag: "live demo · cafe",
    title: "roast & bloom — specialty coffee & bakes",
    intro:
      "crafted for high-footfall cafes and roasteries: digital food & beverage menu, table reservation, and one-tap whatsapp take-away orders.",
    domain: "roastandbloom.coffee",
    badge: "roasting daily · 7:30 am – 10:00 pm",
    accent: "#b45309",
    headline: "slow roasted beans. warm sourdough from the oven.",
    subhead: "single-origin pour overs, espresso bar & house-made pastries.",
    menu: [
      { item: "single-origin pour over", detail: "ethiopian yirgacheffe notes of bergamot & jasmine", price: "₹240" },
      { item: "classic cortado / flat white", detail: "double ristretto pulled over silky textured milk", price: "₹190" },
      { item: "almond butter croissant", detail: "twice baked with house frangipane & toasted flakes", price: "₹180" },
      { item: "nitro cold brew on tap", detail: "18-hour cold steeped for a naturally sweet finish", price: "₹220" },
    ],
    reviews: [
      { stars: 5, author: "Karan D.", text: "the flat white is incredible. love the pre-order on whatsapp for morning rush." },
      { stars: 5, author: "Ananya S.", text: "best sourdough pastries in the city. lovely ambience!" },
    ],
    demonstrates: [
      "visual drinks & food menu with tasting notes and allergen tags",
      "order ahead on whatsapp to skip the morning counter queue",
      "cafe photo strip and location map embed",
      "fresh batch announcements & daily specials spotlight",
      "instant click-to-call and table reservation flow",
    ],
  },
  {
    id: "pulse-athletics",
    category: "fitness club & crossfit",
    tag: "live demo · fitness",
    title: "pulse athletics — strength & conditioning lab",
    intro:
      "tailored for gyms and coaches: membership tier comparisons, daily class timetable, and a free 1-day pass lead generator.",
    domain: "pulseathletics.fit",
    badge: "open 24/7 for members · staffed 6am – 10pm",
    accent: "#16a34a",
    headline: "built for performance. designed for results.",
    subhead: "elite strength training, group conditioning, and personalized nutrition plans.",
    menu: [
      { item: "starter membership (monthly)", detail: "full gym floor access, locker & sauna steam", price: "₹2,499/mo" },
      { item: "unlimited crossfit & hiit", detail: "all group classes, coach support & community events", price: "₹3,999/mo" },
      { item: "1-on-1 personal coaching", detail: "custom macro plan, bi-weekly body scans & 12 PT sessions", price: "₹7,499/mo" },
      { item: "1-day free trial pass", detail: "full facility pass + introductory trainer consultation", price: "free (instant)" },
    ],
    reviews: [
      { stars: 5, author: "Rahul V.", text: "down 8kg in 3 months! the trainers and community keep you motivated every day." },
      { stars: 5, author: "Pooja K.", text: "clean equipment, great energy, and super easy membership sign-up." },
    ],
    demonstrates: [
      "high-converting 'free trial pass' lead capture on whatsapp",
      "transparent tier comparison table with pricing",
      "trainer spotlights and member transformation reviews",
      "live weekly workout timetable with easy booking",
      "map directions to facility with parking info",
    ],
  },
  {
    id: "haven-design",
    category: "architecture & interiors",
    tag: "live demo · architecture",
    title: "haven studios — modern architecture & interiors",
    intro:
      "crafted for high-ticket design studios: minimalist portfolio gallery, case study project breakdowns, and direct consultation inquiries.",
    domain: "havenstudios.design",
    badge: "accepting select projects for Q3/Q4",
    accent: "#0284c7",
    headline: "spaces crafted with quiet luxury and timeless intent.",
    subhead: "bespoke residential villas, sustainable commercial workspaces, and interior transformations.",
    menu: [
      { item: "the glasshouse villa · goa", detail: "4,200 sq.ft private estate with natural passive cooling", price: "completed 2025" },
      { item: "luminary tech hq · bangalore", detail: "open-plan collaborative workspace for 180 devs", price: "completed 2024" },
      { item: "minimalist penthouse · mumbai", detail: "micro-cement textures, custom walnut & sea views", price: "completed 2024" },
      { item: "initial design discovery", detail: "60-min architectural audit & 3D spatial layout consult", price: "complimentary" },
    ],
    reviews: [
      { stars: 5, author: "Devashish M.", text: "haven transformed our villa into an architectural masterpiece. on time and within budget." },
      { stars: 5, author: "Ritu T.", text: "flawless aesthetic execution and exceptional attention to natural lighting." },
    ],
    demonstrates: [
      "editorial case study portfolio with high-res gallery layout",
      "project specifications, square footage & materials breakdown",
      "high-ticket consultation discovery booking on whatsapp",
      "press recognition & architectural award credentials",
      "client testimonial quotes with verified project references",
    ],
  },
] as const;

// Backward compatibility alias for single-demo references
export const conceptProject = featuredProjects[0];

// ============================================================
// About & Team section config
// ============================================================
export const aboutSection = {
  tag: "about cabin and code",
  title: "built by people who care about the craft.",
  intro:
    "we are a tight-knit web studio designing thoughtful, lightning-fast digital experiences for ambitious businesses. no bloated agency overhead, no endless middlemen — just dedicated builders crafting websites with taste.",
  values: [
    {
      label: "01. speed over bloat",
      desc: "every millisecond counts. we build lightweight, high-performance sites that load instantly for your customers.",
    },
    {
      label: "02. design that converts",
      desc: "clean aesthetics backed by clear customer actions, one-tap whatsapp chats, and straightforward booking flows.",
    },
    {
      label: "03. honest & direct",
      desc: "flat pricing, clear timelines, and direct communication with the person writing the code.",
    },
  ],
  team: [
    {
      name: "Aryan",
      role: "founder & lead engineer",
      bio: "obsessed with clean code, micro-interactions, and building high-impact web presence for businesses that want to stand out.",
      avatar: "/avatar.png",
    },
    {
      name: "Studio Team",
      role: "design & development",
      bio: "crafting typography, layout hierarchies, and custom features that turn visitors into paying customers.",
      avatar: "C&C",
    },
  ],
} as const;
