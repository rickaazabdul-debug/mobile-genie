export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mobilegenie.lk";

export interface BrandSeoPage {
  slug: string;
  brandId: string;
  brandName: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroSubtitle: string;
  popularModels: string[];
  repairs: { name: string; priceLkr: string; time: string; warranty: string }[];
  faqs: { q: string; a: string }[];
}

export interface ServiceSeoPage {
  slug: string;
  serviceId: string;
  categoryLabel: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  priceRangeLkr: string;
  turnaround: string;
  warranty: string;
  summary: string;
  highlights: string[];
  faqs: { q: string; a: string }[];
}

export interface LocationSeoPage {
  slug: string;
  name: string;
  region: "Colombo Hub" | "Greater Western & Island-Wide";
  landmarks: string;
  serviceMode: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface GuideSeoPage {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  readTime: string;
  summary: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
  faqs: { q: string; a: string }[];
}

export const BRAND_SEO_PAGES: BrandSeoPage[] = [
  {
    slug: "apple-iphone-repair-sri-lanka",
    brandId: "apple",
    brandName: "Apple",
    h1: "iPhone Repair Sri Lanka & Colombo — Genuine Apple Parts",
    metaTitle:
      "iPhone Repair Sri Lanka & Colombo | Screen, Battery & Face ID | Mobile Genie",
    metaDescription:
      "Same-day iPhone repair in Colombo & Sri Lanka. Genuine & OEM iPhone screen replacement, battery replacement, back glass laser repair & Face ID fix with warranty.",
    keywords: [
      "iPhone repair Sri Lanka",
      "iPhone repair Colombo",
      "iPhone screen replacement Sri Lanka",
      "iPhone battery replacement price in Sri Lanka",
      "Apple authorized repair Sri Lanka",
      "genuine iPhone parts Colombo",
      "iPhone back glass replacement Sri Lanka",
      "iPhone Face ID repair Colombo",
    ],
    heroSubtitle:
      "Precision Apple & iPhone repairs in Colombo using genuine/OEM displays, True Tone programming, zero-cycle batteries, and laser back-glass replacement.",
    popularModels: [
      "iPhone 16 Pro Max",
      "iPhone 15 Pro",
      "iPhone 14 Pro Max",
      "iPhone 13",
      "iPhone 12",
      "iPhone 11",
    ],
    repairs: [
      {
        name: "iPhone Screen Replacement (OLED / Genuine Pulled)",
        priceLkr: "From LKR 14,500",
        time: "30–45 mins",
        warranty: "Lifetime Warranty",
      },
      {
        name: "iPhone Battery Replacement (100% Health + BMS)",
        priceLkr: "From LKR 8,500",
        time: "25 mins",
        warranty: "1-Year Warranty",
      },
      {
        name: "iPhone Back Glass Laser Replacement",
        priceLkr: "From LKR 9,500",
        time: "60 mins",
        warranty: "6-Month Warranty",
      },
      {
        name: "iPhone Face ID & TrueDepth Sensor Repair",
        priceLkr: "From LKR 12,000",
        time: "1–2 hours",
        warranty: "90-Day Warranty",
      },
    ],
    faqs: [
      {
        q: "How much does iPhone screen replacement cost in Sri Lanka?",
        a: "iPhone screen replacement at Mobile Genie Colombo starts from LKR 14,500 for older models and varies for ProMotion 120Hz OLED displays (iPhone 13 Pro to 16 Pro Max). We offer both Original Pulled and Premium Soft-OLED options with True Tone preserved.",
      },
      {
        q: "Do you preserve Face ID and True Tone during iPhone repair in Colombo?",
        a: "Yes. Our technicians transfer and reprogram your original display serial data so True Tone, auto-brightness, and Face ID continue working seamlessly.",
      },
    ],
  },
  {
    slug: "samsung-repair-sri-lanka",
    brandId: "samsung",
    brandName: "Samsung",
    h1: "Samsung Phone Repair Sri Lanka & Colombo Service Center",
    metaTitle:
      "Samsung Phone Repair Sri Lanka | Green Line Fix & Display Replacement | Mobile Genie",
    metaDescription:
      "Expert Samsung repair in Colombo & Sri Lanka. Galaxy S20/S21/S22/S23/S24 green line screen fix, original AMOLED display replacement & Samsung battery swap.",
    keywords: [
      "Samsung phone repair Sri Lanka",
      "Samsung service center Colombo",
      "Samsung display replacement price in Sri Lanka",
      "Samsung green line screen fix Sri Lanka",
      "Samsung Galaxy battery replacement Sri Lanka",
    ],
    heroSubtitle:
      "Colombo's trusted Samsung repair specialists for Dynamic AMOLED 2X screens, S20–S23 green line laser/display fixes, charging boards, and genuine batteries.",
    popularModels: [
      "Galaxy S24 Ultra",
      "Galaxy S23 Ultra",
      "Galaxy S22 / S21 / S20",
      "Galaxy A55 / A54",
      "Galaxy Z Flip / Fold",
    ],
    repairs: [
      {
        name: "Samsung Green Line Screen Fix (S20 / S21 / S22 / S23)",
        priceLkr: "From LKR 24,000",
        time: "45–60 mins",
        warranty: "6-Month Warranty",
      },
      {
        name: "Original Samsung Service Pack AMOLED Display",
        priceLkr: "From LKR 16,500",
        time: "40 mins",
        warranty: "1-Year Warranty",
      },
      {
        name: "Samsung Galaxy Battery Replacement",
        priceLkr: "From LKR 7,500",
        time: "30 mins",
        warranty: "1-Year Warranty",
      },
      {
        name: "USB-C Super Fast Charging Port Repair",
        priceLkr: "From LKR 5,500",
        time: "35 mins",
        warranty: "90-Day Warranty",
      },
    ],
    faqs: [
      {
        q: "Can you fix the Samsung green line screen issue in Sri Lanka?",
        a: "Yes! We repair green and pink vertical lines on Galaxy S20, S21, S22, S23, and Note 20 Ultra series using laser flex bonding where eligible or genuine Samsung Service Pack AMOLED replacements.",
      },
      {
        q: "What is the Samsung display replacement price in Sri Lanka?",
        a: "Galaxy A-series displays start around LKR 12,500, while flagship S-series Dynamic AMOLED Service Packs vary by model. Use our price estimator or book a free diagnostic check.",
      },
    ],
  },
  {
    slug: "google-pixel-repair-sri-lanka",
    brandId: "google",
    brandName: "Google",
    h1: "Google Pixel Repair Sri Lanka & Pixel Screen Replacement Colombo",
    metaTitle:
      "Google Pixel Repair Sri Lanka | Pixel Screen Replacement Colombo | Mobile Genie",
    metaDescription:
      "Fast Google Pixel repair in Colombo & Sri Lanka. Pixel 6, 7, 8, and 9 Pro OLED display replacement, battery swap & fingerprint calibration.",
    keywords: [
      "Google Pixel repair Sri Lanka",
      "Pixel screen replacement Colombo",
      "Google Pixel battery replacement Sri Lanka",
    ],
    heroSubtitle:
      "Specialized Google Pixel screen, battery, and USB-C repairs in Colombo with in-display fingerprint calibration.",
    popularModels: ["Pixel 9 Pro", "Pixel 8 Pro", "Pixel 8a", "Pixel 7a", "Pixel 6 Pro"],
    repairs: [
      {
        name: "Google Pixel OLED Screen Replacement",
        priceLkr: "From LKR 22,000",
        time: "45 mins",
        warranty: "6-Month Warranty",
      },
      {
        name: "Google Pixel Battery Replacement",
        priceLkr: "From LKR 9,500",
        time: "35 mins",
        warranty: "1-Year Warranty",
      },
      {
        name: "Pixel USB-C Port & Camera Bar Glass Fix",
        priceLkr: "From LKR 6,500",
        time: "40 mins",
        warranty: "90-Day Warranty",
      },
    ],
    faqs: [
      {
        q: "Will the Pixel fingerprint sensor work after screen replacement?",
        a: "Yes, we calibrate the optical/ultrasonic under-display fingerprint sensor after installing your new Pixel OLED screen.",
      },
    ],
  },
  {
    slug: "xiaomi-redmi-repair-sri-lanka",
    brandId: "xiaomi",
    brandName: "Xiaomi",
    h1: "Xiaomi & Redmi Phone Repair Sri Lanka — Fast Colombo Service",
    metaTitle:
      "Xiaomi & Redmi Phone Repair Sri Lanka | Display & Battery | Mobile Genie",
    metaDescription:
      "Affordable Xiaomi, Redmi Note & POCO repair in Sri Lanka. Same-day screen replacement, HyperCharge battery swap & motherboard IC repair in Colombo.",
    keywords: [
      "Xiaomi phone repair Sri Lanka",
      "Redmi phone repair Sri Lanka",
      "Redmi Note screen replacement Colombo",
    ],
    heroSubtitle:
      "Same-day screen, battery, and charging board repairs for Xiaomi, Redmi Note, and Redmi series across Sri Lanka.",
    popularModels: ["Xiaomi 14", "Redmi Note 13 Pro", "Redmi Note 12", "Redmi 13C"],
    repairs: [
      {
        name: "Xiaomi / Redmi AMOLED & LCD Screen Replacement",
        priceLkr: "From LKR 7,500",
        time: "35 mins",
        warranty: "6-Month Warranty",
      },
      {
        name: "Xiaomi / Redmi Battery Replacement",
        priceLkr: "From LKR 4,800",
        time: "25 mins",
        warranty: "6-Month Warranty",
      },
      {
        name: "Sub-Board & Fast Charging Port Fix",
        priceLkr: "From LKR 3,800",
        time: "30 mins",
        warranty: "90-Day Warranty",
      },
    ],
    faqs: [
      {
        q: "Do you stock Redmi Note series screens in Colombo?",
        a: "Yes, we keep popular Redmi Note 10, 11, 12, and 13 series displays in stock for 35-minute express replacement.",
      },
    ],
  },
  {
    slug: "oneplus-repair-sri-lanka",
    brandId: "oneplus",
    brandName: "OnePlus",
    h1: "OnePlus Repair & Green Line Screen Replacement Sri Lanka",
    metaTitle:
      "OnePlus Green Line Screen Replacement Sri Lanka | Colombo Repair | Mobile Genie",
    metaDescription:
      "OnePlus green line screen replacement in Sri Lanka. Fast display, Warp Charge battery & Alert Slider repairs for OnePlus 8, 9, 10, 11, 12 & Nord in Colombo.",
    keywords: [
      "OnePlus green line screen replacement Sri Lanka",
      "OnePlus repair Colombo",
      "OnePlus display price Sri Lanka",
    ],
    heroSubtitle:
      "Dedicated OnePlus repair lab in Colombo solving green line AMOLED issues, curved glass cracks, and Warp Charge port faults.",
    popularModels: ["OnePlus 12", "OnePlus 11", "OnePlus 9 Pro", "OnePlus Nord 4"],
    repairs: [
      {
        name: "OnePlus Green Line Display Replacement",
        priceLkr: "From LKR 19,500",
        time: "45 mins",
        warranty: "6-Month Warranty",
      },
      {
        name: "OnePlus Dual-Cell Battery Replacement",
        priceLkr: "From LKR 7,900",
        time: "30 mins",
        warranty: "6-Month Warranty",
      },
    ],
    faqs: [
      {
        q: "Can you fix the OnePlus green line after a software update?",
        a: "Yes, we replace affected OnePlus 8/9/10/11 Fluid AMOLED panels with upgraded displays backed by a 6-month warranty.",
      },
    ],
  },
  {
    slug: "oppo-vivo-repair-sri-lanka",
    brandId: "oppo",
    brandName: "OPPO",
    h1: "OPPO & Vivo Display Replacement Price & Repair in Sri Lanka",
    metaTitle:
      "Oppo & Vivo Display Replacement Price Sri Lanka | Colombo Repair | Mobile Genie",
    metaDescription:
      "Genuine OPPO and Vivo display replacement in Sri Lanka. Same-day Reno, Find, A-series, V-series & Y-series screen and SuperVOOC battery repairs in Colombo.",
    keywords: [
      "Oppo display replacement price in Sri Lanka",
      "Vivo display replacement price Sri Lanka",
      "Oppo phone repair Colombo",
      "Vivo phone repair Sri Lanka",
    ],
    heroSubtitle:
      "Same-day OPPO and Vivo screen, SuperVOOC charging, and battery repairs at transparent Sri Lankan Rupee prices.",
    popularModels: ["OPPO Reno 12", "OPPO A79", "Vivo V30", "Vivo Y200"],
    repairs: [
      {
        name: "OPPO / Vivo Original Display Replacement",
        priceLkr: "From LKR 7,800",
        time: "35 mins",
        warranty: "6-Month Warranty",
      },
      {
        name: "SuperVOOC / FlashCharge Battery & Port Fix",
        priceLkr: "From LKR 4,500",
        time: "30 mins",
        warranty: "90-Day Warranty",
      },
    ],
    faqs: [
      {
        q: "How long does an OPPO or Vivo screen replacement take?",
        a: "Most OPPO A-series, Reno, and Vivo V/Y-series screens are replaced within 35 minutes while you wait.",
      },
    ],
  },
  {
    slug: "huawei-repair-sri-lanka",
    brandId: "huawei",
    brandName: "Huawei",
    h1: "Huawei Phone Repair Sri Lanka — Colombo Express Lab",
    metaTitle:
      "Huawei Phone Repair Sri Lanka | Screen, Battery & Board Repair | Mobile Genie",
    metaDescription:
      "Trusted Huawei phone repair in Sri Lanka. P-series, Mate, Nova & Y-series screen replacement, battery swap, and software/GMS support in Colombo.",
    keywords: [
      "Huawei phone repair Sri Lanka",
      "Huawei screen replacement Colombo",
      "Huawei battery replacement Sri Lanka",
    ],
    heroSubtitle:
      "Expert Huawei Nova, P-series, and Mate repairs in Colombo with genuine-grade displays and batteries.",
    popularModels: ["Huawei Pura 70", "Huawei Nova 12", "Huawei P60 Pro", "Huawei Y9a"],
    repairs: [
      {
        name: "Huawei Display & Glass Replacement",
        priceLkr: "From LKR 8,500",
        time: "45 mins",
        warranty: "6-Month Warranty",
      },
      {
        name: "Huawei SuperCharge Battery Replacement",
        priceLkr: "From LKR 5,200",
        time: "30 mins",
        warranty: "6-Month Warranty",
      },
    ],
    faqs: [
      {
        q: "Do you repair older Huawei Nova and P30/P40 models?",
        a: "Yes, we stock screens, batteries, and charging sub-boards for both recent and classic Huawei smartphones.",
      },
    ],
  },
  {
    slug: "nokia-repair-sri-lanka",
    brandId: "nokia",
    brandName: "Nokia",
    h1: "Nokia Phone Repair Sri Lanka — Screen & Charging Port Specialists",
    metaTitle: "Nokia Phone Repair Sri Lanka | Mobile Genie Colombo",
    metaDescription:
      "Fast Nokia smartphone repair in Sri Lanka. Screen replacement, USB-C charging port fix & battery replacement in Colombo.",
    keywords: ["Nokia repair Sri Lanka", "Nokia screen replacement Colombo"],
    heroSubtitle: "Reliable Nokia G-series, X-series, and C-series repairs in Colombo.",
    popularModels: ["Nokia XR21", "Nokia G42", "Nokia X30", "Nokia C32"],
    repairs: [
      { name: "Nokia Screen Replacement", priceLkr: "From LKR 6,500", time: "40 mins", warranty: "90-Day Warranty" },
      { name: "Nokia USB-C Charging Port Fix", priceLkr: "From LKR 3,500", time: "30 mins", warranty: "90-Day Warranty" },
    ],
    faqs: [{ q: "Can you fix loose Nokia USB-C charging ports?", a: "Yes, we micro-solder and replace worn Nokia charging ports in 30 minutes." }],
  },
  {
    slug: "realme-repair-sri-lanka",
    brandId: "realme",
    brandName: "Realme",
    h1: "Realme Phone Repair Sri Lanka & Colombo",
    metaTitle: "Realme Phone Repair Sri Lanka | Display & Battery | Mobile Genie",
    metaDescription: "Same-day Realme GT, Narzo, and C-series screen and battery repair in Colombo, Sri Lanka.",
    keywords: ["Realme repair Sri Lanka", "Realme display replacement Colombo"],
    heroSubtitle: "Express Realme display, Dart Charge port, and battery replacements.",
    popularModels: ["Realme GT 6", "Realme 12 Pro+", "Realme Narzo 70", "Realme C67"],
    repairs: [
      { name: "Realme Display Replacement", priceLkr: "From LKR 7,200", time: "35 mins", warranty: "6-Month Warranty" },
      { name: "Realme Battery Replacement", priceLkr: "From LKR 4,500", time: "25 mins", warranty: "6-Month Warranty" },
    ],
    faqs: [{ q: "Do you repair Realme curved AMOLED screens?", a: "Yes, we handle both flat LCD and curved AMOLED Realme displays." }],
  },
  {
    slug: "poco-repair-sri-lanka",
    brandId: "poco",
    brandName: "POCO",
    h1: "POCO Phone Repair Sri Lanka — Reballing & Screen Specialists",
    metaTitle: "POCO Phone Repair Sri Lanka | CPU Reballing & Display | Mobile Genie",
    metaDescription: "POCO X3 Pro, F-series & M-series dead boot CPU reballing and display replacement in Colombo, Sri Lanka.",
    keywords: ["POCO repair Sri Lanka", "POCO X3 Pro dead fix Colombo"],
    heroSubtitle: "Specialized POCO screen replacements and motherboard CPU/PMIC reballing in Colombo.",
    popularModels: ["POCO F6", "POCO X6 Pro", "POCO M6 Pro", "POCO X3 Pro"],
    repairs: [
      { name: "POCO Dead Boot / CPU Reballing", priceLkr: "From LKR 9,500", time: "Same Day", warranty: "90-Day Warranty" },
      { name: "POCO 120Hz Display Replacement", priceLkr: "From LKR 8,200", time: "40 mins", warranty: "6-Month Warranty" },
    ],
    faqs: [{ q: "Can you recover data from a dead POCO X3 Pro?", a: "Yes, our chip-level lab performs CPU/RAM reballing to revive dead POCO phones with data intact." }],
  },
  {
    slug: "motorola-repair-sri-lanka",
    brandId: "motorola",
    brandName: "Motorola",
    h1: "Motorola Phone Repair Sri Lanka — Edge, Moto G & Razr",
    metaTitle: "Motorola Phone Repair Sri Lanka | Mobile Genie Colombo",
    metaDescription: "Motorola Edge, Moto G, and Razr screen, battery, and charging repairs in Colombo, Sri Lanka.",
    keywords: ["Motorola repair Sri Lanka", "Moto G screen replacement Colombo"],
    heroSubtitle: "Precision repairs for Motorola Edge, Moto G, and Razr foldable devices.",
    popularModels: ["Moto Edge 50", "Moto G84", "Razr 40 Ultra", "Moto G54"],
    repairs: [
      { name: "Motorola pOLED / LCD Screen Replacement", priceLkr: "From LKR 9,500", time: "45 mins", warranty: "6-Month Warranty" },
      { name: "Motorola TurboPower Battery Swap", priceLkr: "From LKR 5,200", time: "30 mins", warranty: "6-Month Warranty" },
    ],
    faqs: [{ q: "Do you source Motorola parts in Sri Lanka?", a: "Yes, we stock popular Moto G/Edge parts and offer express sourcing for Razr foldables." }],
  },
  {
    slug: "zte-repair-sri-lanka",
    brandId: "zte",
    brandName: "ZTE",
    h1: "ZTE & RedMagic Phone Repair Sri Lanka",
    metaTitle: "ZTE & Nubia RedMagic Repair Sri Lanka | Mobile Genie Colombo",
    metaDescription: "ZTE Blade, Axon, and Nubia RedMagic gaming phone repair in Colombo, Sri Lanka.",
    keywords: ["ZTE repair Sri Lanka", "RedMagic repair Colombo"],
    heroSubtitle: "Expert ZTE and RedMagic cooling fan, trigger, screen, and battery repairs.",
    popularModels: ["RedMagic 9 Pro", "Nubia Z60 Ultra", "ZTE Axon 50", "ZTE Blade V50"],
    repairs: [
      { name: "ZTE / RedMagic Display Replacement", priceLkr: "From LKR 12,000", time: "60 mins", warranty: "90-Day Warranty" },
      { name: "Charging & Cooling Fan Repair", priceLkr: "From LKR 5,500", time: "45 mins", warranty: "90-Day Warranty" },
    ],
    faqs: [{ q: "Do you repair RedMagic gaming phones?", a: "Yes, we service RedMagic displays, shoulder triggers, and internal cooling fans." }],
  },
  {
    slug: "nothing-repair-sri-lanka",
    brandId: "nothing",
    brandName: "Nothing",
    h1: "Nothing Phone Repair Sri Lanka — Phone (1), (2), (2a) & CMF",
    metaTitle: "Nothing Phone Repair Sri Lanka | Screen & Glyph Repair | Mobile Genie",
    metaDescription: "Nothing Phone (1), (2), (2a), and CMF Phone 1 screen, Glyph LED, and battery repair in Colombo, Sri Lanka.",
    keywords: ["Nothing Phone repair Sri Lanka", "Nothing Phone 2a screen Colombo"],
    heroSubtitle: "Careful transparent-back, Glyph LED, and flexible OLED repairs for Nothing smartphones.",
    popularModels: ["Nothing Phone (2a)", "Nothing Phone (2)", "Nothing Phone (1)", "CMF Phone 1"],
    repairs: [
      { name: "Nothing Phone Flexible OLED Replacement", priceLkr: "From LKR 18,500", time: "45 mins", warranty: "6-Month Warranty" },
      { name: "Transparent Back & Glyph LED Repair", priceLkr: "From LKR 8,500", time: "45 mins", warranty: "90-Day Warranty" },
    ],
    faqs: [{ q: "Will the Glyph interface work after repair?", a: "Yes, we preserve and test all Glyph LED zones during reassembly." }],
  },
  {
    slug: "umidigi-repair-sri-lanka",
    brandId: "umidigi",
    brandName: "UMIDIGI",
    h1: "UMIDIGI Phone Repair Sri Lanka — Rugged & A-Series",
    metaTitle: "UMIDIGI Phone Repair Sri Lanka | Mobile Genie Colombo",
    metaDescription: "UMIDIGI Bison, A-series, and G-series screen, battery, and USB-C repair in Sri Lanka.",
    keywords: ["UMIDIGI repair Sri Lanka", "UMIDIGI screen replacement Colombo"],
    heroSubtitle: "Dedicated repair support for UMIDIGI rugged Bison and A-series devices.",
    popularModels: ["UMIDIGI A15", "UMIDIGI Bison GT2", "UMIDIGI G9", "UMIDIGI F3"],
    repairs: [
      { name: "UMIDIGI Screen & Digitizer Repair", priceLkr: "From LKR 7,500", time: "45 mins", warranty: "90-Day Warranty" },
      { name: "UMIDIGI Battery & Port Replacement", priceLkr: "From LKR 4,500", time: "35 mins", warranty: "90-Day Warranty" },
    ],
    faqs: [{ q: "Do you repair rugged UMIDIGI Bison phones?", a: "Yes, we reseal rugged housings after screen or charging port replacement." }],
  },
  {
    slug: "honor-repair-sri-lanka",
    brandId: "honor",
    brandName: "HONOR",
    h1: "HONOR Phone Repair Sri Lanka — Magic, X9b & Number Series",
    metaTitle: "HONOR Phone Repair Sri Lanka | X9b & Magic Screen Fix | Mobile Genie",
    metaDescription: "HONOR X9b, HONOR 90, HONOR 200 & Magic6 Pro screen and battery replacement in Colombo, Sri Lanka.",
    keywords: ["HONOR phone repair Sri Lanka", "HONOR X9b screen replacement Colombo"],
    heroSubtitle: "Fast HONOR curved AMOLED display, battery, and SuperCharge repairs in Colombo.",
    popularModels: ["HONOR Magic6 Pro", "HONOR 200 Pro", "HONOR X9b", "HONOR 90"],
    repairs: [
      { name: "HONOR Curved / Flat Display Replacement", priceLkr: "From LKR 12,500", time: "45 mins", warranty: "6-Month Warranty" },
      { name: "HONOR High-Density Battery Swap", priceLkr: "From LKR 5,800", time: "30 mins", warranty: "6-Month Warranty" },
    ],
    faqs: [{ q: "Do you replace HONOR X9b curved displays?", a: "Yes, we stock HONOR X9b and HONOR 90 curved AMOLED assemblies." }],
  },
  {
    slug: "tcl-repair-sri-lanka",
    brandId: "tcl",
    brandName: "TCL",
    h1: "TCL Phone Repair Sri Lanka — NXTPAPER & 5G Series",
    metaTitle: "TCL Phone Repair Sri Lanka | Mobile Genie Colombo",
    metaDescription: "TCL smartphone screen, battery, and charging port repair in Colombo, Sri Lanka.",
    keywords: ["TCL phone repair Sri Lanka", "TCL screen replacement Colombo"],
    heroSubtitle: "Reliable screen, battery, and software repairs for TCL smartphones.",
    popularModels: ["TCL 50 XL", "TCL 40 NXTPAPER", "TCL 30 XE", "TCL Stylus 5G"],
    repairs: [
      { name: "TCL Display Replacement", priceLkr: "From LKR 7,500", time: "45 mins", warranty: "90-Day Warranty" },
      { name: "TCL Charging & Battery Service", priceLkr: "From LKR 4,500", time: "30 mins", warranty: "90-Day Warranty" },
    ],
    faqs: [{ q: "How long does a TCL repair take?", a: "Standard battery and port repairs take 30 minutes; screens take 45 minutes." }],
  },
];

export const SERVICE_SEO_PAGES: ServiceSeoPage[] = [
  {
    slug: "screen-display-replacement-sri-lanka",
    serviceId: "screen-replacement",
    categoryLabel: "Screen & Display",
    h1: "Phone Display Replacement Price in Sri Lanka — Cracked Screen Repair",
    metaTitle:
      "Phone Display Replacement Price in Sri Lanka | Cracked Screen Repair Colombo | Mobile Genie",
    metaDescription:
      "Transparent phone display replacement prices in Sri Lanka. Broken phone display repair in Colombo & touch screen not working fixes in 30–45 minutes.",
    keywords: [
      "phone display replacement price in Sri Lanka",
      "cracked phone screen repair near me",
      "broken phone display repair Colombo",
      "touch screen not working repair Sri Lanka",
    ],
    priceRangeLkr: "LKR 6,500 – 85,000",
    turnaround: "30–45 mins",
    warranty: "Lifetime Screen Warranty",
    summary:
      "Whether you have a shattered glass top layer, dead pixels, green lines, or an unresponsive touch digitizer, Mobile Genie restores factory brightness, 120Hz smoothness, and water-resistant sealing.",
    highlights: [
      "Original Service Pack, Pulled OEM, and Premium Soft-OLED options",
      "True Tone, auto-brightness & under-display fingerprint calibration",
      "30–45 minute express replacement while you wait in Colombo",
      "Dust-free installation with complimentary tempered glass option",
    ],
    faqs: [
      {
        q: "Can you fix a touch screen not working without losing data?",
        a: "Yes. Screen and digitizer replacements do not wipe your phone's storage—your photos, WhatsApp chats, and apps stay intact.",
      },
      {
        q: "What is the difference between Original and Copy display prices in Sri Lanka?",
        a: "Original/OEM displays offer full brightness, 120Hz refresh rate, and thinner bezels, while AAA Copy LCDs are budget-friendly. We explain both options upfront before repair.",
      },
    ],
  },
  {
    slug: "battery-charging-repair-sri-lanka",
    serviceId: "battery-swap",
    categoryLabel: "Battery & Charging",
    h1: "Mobile Phone Battery Replacement & Charging Port Repair Sri Lanka",
    metaTitle:
      "Mobile Phone Battery Replacement Sri Lanka | Charging Port Repair Colombo | Mobile Genie",
    metaDescription:
      "Swollen phone battery replacement & phone not charging repair in Colombo, Sri Lanka. Zero-cycle batteries & USB-C/Lightning port micro-soldering.",
    keywords: [
      "mobile phone battery replacement Sri Lanka",
      "phone charging port repair near me",
      "phone not charging repair Colombo",
      "swollen phone battery replacement Sri Lanka",
    ],
    priceRangeLkr: "LKR 3,500 – 18,500",
    turnaround: "20–35 mins",
    warranty: "Up to 1-Year Warranty",
    summary:
      "Fast-draining, overheating, or swollen batteries are a safety hazard. We safely remove swollen cells and fix loose USB-C / Lightning ports or faulty charging ICs.",
    highlights: [
      "Zero-cycle OEM-grade batteries with thermal sensor protection",
      "Safe anti-static removal of swollen batteries",
      "Ultrasonic port cleaning (often fixes loose cables in 10 mins)",
      "Micro-soldered USB-C & Lightning port replacement",
    ],
    faqs: [
      {
        q: "Is a swollen phone battery dangerous?",
        a: "Yes, a swollen lithium battery can crack your screen or back glass and pose a fire risk. Bring it in immediately for safe 20-minute replacement.",
      },
      {
        q: "What if my phone is not charging even with a new cable?",
        a: "It could be compacted lint, a damaged USB-C port, or a faulty charging IC on the motherboard. We run a free amp-draw diagnostic first.",
      },
    ],
  },
  {
    slug: "motherboard-ic-chip-repair-colombo",
    serviceId: "diagnostics-unlock",
    categoryLabel: "Advanced / Chip-Level Repairs",
    h1: "Mobile Motherboard Repair Sri Lanka & IC Chip Level Phone Repair Colombo",
    metaTitle:
      "Mobile Motherboard Repair Sri Lanka | IC Chip Level Phone Repair Colombo | Mobile Genie",
    metaDescription:
      "Precision IC chip-level phone repair in Colombo, Sri Lanka. Power IC, charging IC, baseband/no-service, audio IC & CPU reballing under stereo microscope.",
    keywords: [
      "mobile motherboard repair Sri Lanka",
      "IC chip level phone repair Colombo",
      "phone no service baseband repair Sri Lanka",
    ],
    priceRangeLkr: "LKR 6,500 – 28,000",
    turnaround: "Same Day – 24 Hours",
    warranty: "90-Day Board Warranty",
    summary:
      "When a phone has a shorted logic board, no power, no network/IMEI, or boot-looping, our Colombo micro-soldering lab diagnoses and repairs down to the individual SMD capacitor and BGA IC.",
    highlights: [
      "Thermal camera short-circuit detection",
      "Power IC, Tristar/Hydra charging IC & Audio IC replacement",
      "CPU / RAM reballing for dead boot devices (POCO, iPhone, Samsung)",
      "No-Fix, No-Fee logic board diagnostic guarantee",
    ],
    faqs: [
      {
        q: "Do you do micro-soldering in-house in Colombo?",
        a: "Yes, all IC chip-level motherboard repairs are performed in-house at our Colombo lab—never outsourced.",
      },
    ],
  },
  {
    slug: "water-damage-data-recovery-sri-lanka",
    serviceId: "water-damage",
    categoryLabel: "Liquid & Data Recovery",
    h1: "Water Damaged Phone Repair & Dead Phone Data Recovery Sri Lanka",
    metaTitle:
      "Water Damaged Phone Repair Sri Lanka | Dead Phone Data Recovery | Mobile Genie",
    metaDescription:
      "Emergency water damaged phone repair & dead phone data recovery in Colombo, Sri Lanka. Ultrasonic logic board cleaning & corrosion removal.",
    keywords: [
      "water damaged phone repair Sri Lanka",
      "dead phone data recovery Sri Lanka",
      "liquid damage phone repair Colombo",
    ],
    priceRangeLkr: "LKR 5,500 – 22,000",
    turnaround: "Same Day",
    warranty: "90-Day Service Warranty",
    summary:
      "Dropped your phone in water, rain, or seawater? Do not plug it into a charger or put it in rice—bring it to Mobile Genie for immediate ultrasonic PCB cleaning and data rescue.",
    highlights: [
      "Immediate battery disconnection & moisture extraction",
      "Ultrasonic chemical bath to halt motherboard corrosion",
      "Data recovery priority for photos, contacts & business files",
      "Full 32-point post-recovery hardware verification",
    ],
    faqs: [
      {
        q: "Can you recover photos from a completely dead phone in Sri Lanka?",
        a: "In most cases, yes. Even if the screen or motherboard is damaged, we repair the power rail or extract data from the intact NAND storage.",
      },
    ],
  },
  {
    slug: "speaker-mic-camera-repair-colombo",
    serviceId: "camera-repair",
    categoryLabel: "Audio & Camera",
    h1: "Phone Speaker, Mic & Camera Lens Replacement Colombo",
    metaTitle:
      "Phone Speaker & Mic Repair Colombo | Camera Lens Replacement Sri Lanka | Mobile Genie",
    metaDescription:
      "Muffled earpiece, broken microphone & cracked camera lens replacement in Colombo, Sri Lanka. Same-day OIS camera & sapphire lens glass repair.",
    keywords: [
      "phone speaker and mic repair Colombo",
      "phone camera lens replacement Sri Lanka",
      "blurry phone camera repair Colombo",
    ],
    priceRangeLkr: "LKR 2,500 – 16,500",
    turnaround: "30–45 mins",
    warranty: "90-Day Warranty",
    summary:
      "Fix crackling loudspeakers, low call-mic volume, blurry focus, black camera screens, or shattered rear sapphire camera lens glass in under 45 minutes.",
    highlights: [
      "Dust-free sapphire rear camera lens glass replacement",
      "Original OIS main, ultrawide & telephoto camera modules",
      "Earpiece, bottom loudspeaker & dual-mic acoustic cleaning/replacement",
    ],
    faqs: [
      {
        q: "Do you need to replace the whole camera if only the outer glass is cracked?",
        a: "No! If your camera sensor still focuses cleanly, we replace just the outer sapphire lens glass at a fraction of the cost.",
      },
    ],
  },
  {
    slug: "doorstep-pickup-unlocking-software-sri-lanka",
    serviceId: "diagnostics-unlock",
    categoryLabel: "Doorstep, Unlocking & Software",
    h1: "Doorstep Mobile Repair Colombo, Phone Pickup & Software Unlocking",
    metaTitle:
      "Doorstep Mobile Repair Service Colombo | Pickup & Unlocking Sri Lanka | Mobile Genie",
    metaDescription:
      "Doorstep mobile repair service in Colombo & island-wide phone pickup and delivery across Sri Lanka. Carrier unlocking, software flashing & updates.",
    keywords: [
      "doorstep mobile repair service Colombo",
      "phone pickup and delivery repair Sri Lanka",
      "mobile phone unlocking service Sri Lanka",
      "phone software flashing and update Sri Lanka",
    ],
    priceRangeLkr: "LKR 1,500 – 12,000",
    turnaround: "Same Day",
    warranty: "Service Guarantee",
    summary:
      "Too busy to visit our shop? Book our Colombo doorstep pickup & delivery repair, or get official carrier unlocking, firmware flashing, and boot-loop software recovery.",
    highlights: [
      "Insured doorstep pickup & return delivery across Colombo 1–15 & suburbs",
      "Island-wide courier repair service (Kandy, Galle, Negombo, Kurunegala)",
      "Official carrier network unlocking & region firmware flashing",
      "OS boot-loop recovery & official security update flashing",
    ],
    faqs: [
      {
        q: "How does doorstep mobile repair service in Colombo work?",
        a: "Book an appointment online, our rider collects your device from your home or office in Colombo, we repair and test it at our lab, and deliver it back the same day.",
      },
    ],
  },
];

export const LOCATION_SEO_PAGES: LocationSeoPage[] = [
  // Colombo Hubs
  {
    slug: "bambalapitiya",
    name: "Bambalapitiya (Majestic City / Unity Plaza)",
    region: "Colombo Hub",
    landmarks: "Majestic City, Unity Plaza & Galle Road",
    serviceMode: "15-Min Walk-In & Express Pickup",
    h1: "Mobile Phone Repair in Bambalapitiya (Majestic City & Unity Plaza)",
    metaTitle: "Mobile Phone Repair Bambalapitiya | Majestic City & Unity Plaza | Mobile Genie",
    metaDescription: "Express phone repair near Majestic City & Unity Plaza, Bambalapitiya. Genuine iPhone, Samsung & Pixel screen and battery repair with warranty.",
    keywords: ["phone repair Bambalapitiya", "mobile repair Unity Plaza", "iPhone repair Majestic City"],
  },
  {
    slug: "wellawatte",
    name: "Wellawatte",
    region: "Colombo Hub",
    landmarks: "Galle Road & Savoy Cinema Junction",
    serviceMode: "Same-Day Walk-In & Doorstep Pickup",
    h1: "Mobile Phone Repair in Wellawatte — Express Screen & Battery Fix",
    metaTitle: "Mobile Phone Repair Wellawatte | Phone Repair Near Me | Mobile Genie",
    metaDescription: "Trusted smartphone repair service in Wellawatte, Colombo 06. Same-day screen replacement, charging port & battery repairs.",
    keywords: ["phone repair Wellawatte", "mobile repair Colombo 06"],
  },
  {
    slug: "kollupitiya",
    name: "Kollupitiya",
    region: "Colombo Hub",
    landmarks: "Liberty Plaza & Duplication Road",
    serviceMode: "30-Min Express & Office Pickup",
    h1: "Mobile Phone Repair in Kollupitiya (Colombo 03)",
    metaTitle: "Mobile Phone Repair Kollupitiya | Liberty Plaza Area | Mobile Genie",
    metaDescription: "Fast mobile repair near Liberty Plaza, Kollupitiya. Office pickup & delivery for iPhone, Samsung & Google Pixel repairs.",
    keywords: ["phone repair Kollupitiya", "mobile repair Liberty Plaza", "Colombo 03 phone repair"],
  },
  {
    slug: "dehiwala",
    name: "Dehiwala",
    region: "Colombo Hub",
    landmarks: "Dehiwala Junction & Hill Street",
    serviceMode: "Same-Day Pickup & Delivery",
    h1: "Mobile Phone Repair in Dehiwala — Same-Day Service",
    metaTitle: "Mobile Phone Repair Dehiwala | Express Repair | Mobile Genie",
    metaDescription: "Book same-day mobile phone repair in Dehiwala. Cracked screens, batteries, and water damage fixed with genuine parts.",
    keywords: ["phone repair Dehiwala", "mobile repair center Dehiwala"],
  },
  {
    slug: "nugegoda",
    name: "Nugegoda",
    region: "Colombo Hub",
    landmarks: "Nugegoda Supermarket & High Level Road",
    serviceMode: "Same-Day Pickup & Express Lab",
    h1: "Mobile Phone Repair in Nugegoda — Best Local Repair Shop",
    metaTitle: "Mobile Phone Repair Nugegoda | Screen & Battery | Mobile Genie",
    metaDescription: "Top-rated mobile repair in Nugegoda. Genuine iPhone, Samsung, Xiaomi & OPPO repairs with warranty and pickup.",
    keywords: ["phone repair Nugegoda", "mobile repair Nugegoda"],
  },
  {
    slug: "maharagama",
    name: "Maharagama",
    region: "Colombo Hub",
    landmarks: "Maharagama Clock Tower & High Level Road",
    serviceMode: "Same-Day Doorstep Pickup",
    h1: "Mobile Phone Repair in Maharagama",
    metaTitle: "Mobile Phone Repair Maharagama | Mobile Genie Sri Lanka",
    metaDescription: "Express phone screen, battery, and motherboard repair for Maharagama customers with doorstep pickup.",
    keywords: ["phone repair Maharagama", "mobile repair Maharagama"],
  },
  {
    slug: "rajagiriya",
    name: "Rajagiriya",
    region: "Colombo Hub",
    landmarks: "Rajagiriya Flyover & Parliament Road",
    serviceMode: "Same-Day Doorstep Pickup",
    h1: "Mobile Phone Repair in Rajagiriya",
    metaTitle: "Mobile Phone Repair Rajagiriya | Mobile Genie Colombo",
    metaDescription: "Fast smartphone repair & doorstep pickup in Rajagiriya. iPhone, Samsung, and Pixel specialists.",
    keywords: ["phone repair Rajagiriya", "mobile repair Rajagiriya"],
  },
  {
    slug: "battaramulla",
    name: "Battaramulla",
    region: "Colombo Hub",
    landmarks: "Pelawatte & Battaramulla Town",
    serviceMode: "Same-Day Doorstep Pickup",
    h1: "Mobile Phone Repair in Battaramulla & Pelawatte",
    metaTitle: "Mobile Phone Repair Battaramulla | Mobile Genie Colombo",
    metaDescription: "Doorstep mobile phone repair pickup and express lab service for Battaramulla and Pelawatte.",
    keywords: ["phone repair Battaramulla", "mobile repair Pelawatte"],
  },
  {
    slug: "kirulapone",
    name: "Kirulapone",
    region: "Colombo Hub",
    landmarks: "Kirulapone Junction & Baseline Road",
    serviceMode: "20-Min Express Pickup",
    h1: "Mobile Phone Repair in Kirulapone (Colombo 05)",
    metaTitle: "Mobile Phone Repair Kirulapone | Mobile Genie Colombo",
    metaDescription: "Quick phone repair near Kirulapone & Havelock Town. Screen, battery & charging port repairs.",
    keywords: ["phone repair Kirulapone", "mobile repair Colombo 05"],
  },
  {
    slug: "borella",
    name: "Borella",
    region: "Colombo Hub",
    landmarks: "Borella Junction & Ward Place",
    serviceMode: "Same-Day Pickup & Lab Service",
    h1: "Mobile Phone Repair in Borella (Colombo 08)",
    metaTitle: "Mobile Phone Repair Borella | Mobile Genie Colombo",
    metaDescription: "Express smartphone repair in Borella, Colombo 08. Same-day display and battery replacements.",
    keywords: ["phone repair Borella", "mobile repair Colombo 08"],
  },
  {
    slug: "pettah",
    name: "Pettah",
    region: "Colombo Hub",
    landmarks: "1st Cross Street & Main Street, Colombo 11",
    serviceMode: "Express Parts & Chip-Level Lab",
    h1: "Mobile Phone Repair & Spare Parts near Pettah (Colombo 11)",
    metaTitle: "Mobile Phone Repair Pettah | Spare Parts & Board Repair | Mobile Genie",
    metaDescription: "Genuine mobile phone spare parts and chip-level motherboard repair serving Pettah & Colombo Fort.",
    keywords: ["mobile phone spare parts Sri Lanka", "phone repair Pettah", "Colombo 11 mobile repair"],
  },
  // Greater Western & Island-Wide
  {
    slug: "negombo",
    name: "Negombo",
    region: "Greater Western & Island-Wide",
    landmarks: "Negombo Town & Beach Road",
    serviceMode: "Express Courier & Same-Day Western Hub",
    h1: "Mobile Phone Repair Negombo — Express Pickup & Courier",
    metaTitle: "Mobile Phone Repair Negombo | Mobile Genie Sri Lanka",
    metaDescription: "Fast, insured smartphone repair for Negombo residents. iPhone, Samsung, Pixel & Xiaomi repairs with warranty.",
    keywords: ["phone repair Negombo", "iPhone repair Negombo"],
  },
  {
    slug: "wattala",
    name: "Wattala",
    region: "Greater Western & Island-Wide",
    landmarks: "Negombo Road & Hendala",
    serviceMode: "Same-Day Pickup & Delivery",
    h1: "Mobile Phone Repair Wattala",
    metaTitle: "Mobile Phone Repair Wattala | Mobile Genie Sri Lanka",
    metaDescription: "Book same-day phone screen and battery repair from Wattala with Mobile Genie.",
    keywords: ["phone repair Wattala", "mobile repair Wattala"],
  },
  {
    slug: "ja-ela",
    name: "Ja-Ela",
    region: "Greater Western & Island-Wide",
    landmarks: "Ja-Ela Town & K-Zone Area",
    serviceMode: "Express Pickup & Courier",
    h1: "Mobile Phone Repair Ja-Ela",
    metaTitle: "Mobile Phone Repair Ja-Ela | Mobile Genie Sri Lanka",
    metaDescription: "Reliable mobile phone repair service for Ja-Ela & Kandana.",
    keywords: ["phone repair Ja-Ela", "mobile repair Ja-Ela"],
  },
  {
    slug: "kadawatha",
    name: "Kadawatha",
    region: "Greater Western & Island-Wide",
    landmarks: "Kadawatha Interchange & Kandy Road",
    serviceMode: "Express Pickup & Courier",
    h1: "Mobile Phone Repair Kadawatha",
    metaTitle: "Mobile Phone Repair Kadawatha | Mobile Genie Sri Lanka",
    metaDescription: "Fast iPhone, Samsung & Android repair for Kadawatha customers.",
    keywords: ["phone repair Kadawatha", "mobile repair Kadawatha"],
  },
  {
    slug: "gampaha",
    name: "Gampaha",
    region: "Greater Western & Island-Wide",
    landmarks: "Gampaha Town & Colombo Road",
    serviceMode: "Express Courier Repair",
    h1: "Mobile Phone Repair Gampaha",
    metaTitle: "Mobile Phone Repair Gampaha | Mobile Genie Sri Lanka",
    metaDescription: "Trusted mobile repair and genuine parts delivery for Gampaha District.",
    keywords: ["phone repair Gampaha", "iPhone repair Gampaha"],
  },
  {
    slug: "moratuwa",
    name: "Moratuwa",
    region: "Greater Western & Island-Wide",
    landmarks: "Moratuwa Town & Galle Road",
    serviceMode: "Same-Day Pickup & Delivery",
    h1: "Mobile Phone Repair Moratuwa",
    metaTitle: "Mobile Phone Repair Moratuwa | Mobile Genie Sri Lanka",
    metaDescription: "Same-day phone screen, battery & charging port repair for Moratuwa.",
    keywords: ["phone repair Moratuwa", "mobile repair Moratuwa"],
  },
  {
    slug: "panadura",
    name: "Panadura",
    region: "Greater Western & Island-Wide",
    landmarks: "Panadura Town & Galle Road",
    serviceMode: "Express Courier Repair",
    h1: "Mobile Phone Repair Panadura",
    metaTitle: "Mobile Phone Repair Panadura | Mobile Genie Sri Lanka",
    metaDescription: "Expert smartphone repair & insured pickup for Panadura residents.",
    keywords: ["phone repair Panadura", "mobile repair Panadura"],
  },
  {
    slug: "kandy",
    name: "Kandy",
    region: "Greater Western & Island-Wide",
    landmarks: "Kandy City Centre & Peradeniya Road",
    serviceMode: "24–48h Insured Island-Wide Courier",
    h1: "Mobile Phone Repair Kandy — Insured Island-Wide Service",
    metaTitle: "Mobile Phone Repair Kandy | iPhone & Samsung | Mobile Genie Sri Lanka",
    metaDescription: "Send your phone from Kandy via insured express courier for genuine iPhone, Samsung green line & IC chip-level motherboard repairs.",
    keywords: ["phone repair Kandy", "iPhone repair Kandy", "Samsung repair Kandy"],
  },
  {
    slug: "kurunegala",
    name: "Kurunegala",
    region: "Greater Western & Island-Wide",
    landmarks: "Kurunegala Town & Colombo Road",
    serviceMode: "24–48h Insured Island-Wide Courier",
    h1: "Mobile Phone Repair Kurunegala — Insured Express Courier",
    metaTitle: "Mobile Phone Repair Kurunegala | Mobile Genie Sri Lanka",
    metaDescription: "Genuine mobile repairs and chip-level motherboard service for Kurunegala.",
    keywords: ["phone repair Kurunegala", "mobile repair Kurunegala"],
  },
  {
    slug: "galle",
    name: "Galle",
    region: "Greater Western & Island-Wide",
    landmarks: "Galle Fort & Wakwella Road",
    serviceMode: "24–48h Insured Island-Wide Courier",
    h1: "Mobile Phone Repair Galle — Insured Express Courier",
    metaTitle: "Mobile Phone Repair Galle | iPhone & Samsung | Mobile Genie Sri Lanka",
    metaDescription: "Genuine smartphone screen, battery, and data recovery service for Galle via insured courier.",
    keywords: ["phone repair Galle", "iPhone repair Galle"],
  },
];

export const GUIDE_SEO_PAGES: GuideSeoPage[] = [
  {
    slug: "iphone-screen-replacement-cost-sri-lanka",
    h1: "How Much Does iPhone Screen Replacement Cost in Sri Lanka? (2026 Guide)",
    metaTitle:
      "How Much Does iPhone Screen Replacement Cost in Sri Lanka? | Mobile Genie",
    metaDescription:
      "Complete 2026 Sri Lanka price guide for iPhone 11, 12, 13, 14, 15 & 16 Pro screen replacement. Compare Original Pulled vs Soft OLED prices in LKR.",
    keywords: [
      "how much does iPhone screen replacement cost in Sri Lanka",
      "iPhone screen replacement price Sri Lanka",
      "iPhone display price Colombo",
    ],
    readTime: "4 min read",
    summary:
      "iPhone display prices in Sri Lanka depend on your model and screen tier (Original Pulled vs. Soft-OLED vs. Incell LCD). Here is a transparent breakdown so you never overpay.",
    sections: [
      {
        heading: "Estimated iPhone Screen Replacement Prices in Sri Lanka (LKR)",
        body: "Prices include installation, waterproof adhesive resealing, and True Tone programming at Mobile Genie Colombo:",
        bullets: [
          "iPhone 11 / XR: LKR 14,500 – 22,000",
          "iPhone 12 / 12 Pro: LKR 19,500 – 34,000",
          "iPhone 13 / 13 Pro / Pro Max: LKR 24,000 – 68,000",
          "iPhone 14 / 14 Pro / Pro Max: LKR 28,000 – 78,000",
          "iPhone 15 / 16 Pro Series: LKR 38,000 – 95,000",
        ],
      },
      {
        heading: "What Affects the Price?",
        body: "120Hz ProMotion LTPO OLED panels (on Pro models) cost more than standard 60Hz displays. Always ask whether True Tone and Face ID flex cables are safely transferred.",
      },
    ],
    faqs: [
      {
        q: "How long does iPhone screen replacement take in Colombo?",
        a: "At Mobile Genie, most iPhone screen replacements take 30 to 45 minutes while you wait.",
      },
    ],
  },
  {
    slug: "original-vs-copy-display-price-sri-lanka",
    h1: "Original vs Copy Display Price in Sri Lanka — Which Should You Choose?",
    metaTitle:
      "Original vs Copy Display Price Sri Lanka | OLED vs LCD Guide | Mobile Genie",
    metaDescription:
      "Learn the real difference between Original Service Pack, OEM Pulled, Soft OLED, and Copy LCD displays in Sri Lanka—brightness, battery drain & pricing.",
    keywords: [
      "original vs copy display price Sri Lanka",
      "OEM vs copy phone screen Colombo",
      "Soft OLED vs Incell LCD Sri Lanka",
    ],
    readTime: "5 min read",
    summary:
      "When replacing a broken screen in Sri Lanka, repair shops often quote vastly different prices. Understanding display grades protects your phone's battery life and touch response.",
    sections: [
      {
        heading: "Comparing the 3 Display Grades in Sri Lanka",
        body: "Every tier has a clear use case depending on your budget and how long you plan to keep the phone:",
        bullets: [
          "Original / Service Pack: Factory brightness, exact color accuracy, 120Hz support, and lowest battery draw.",
          "Premium Soft-OLED: Flexible OLED substrate that matches original thinness and deep blacks at ~25–35% lower cost.",
          "Copy / Incell LCD: Budget option for older phones or quick data recovery; slightly thicker bezel and higher power use.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does a copy LCD screen drain the battery faster?",
        a: "Yes, an LCD backlight draws more power than an OLED panel on phones designed for OLED displays.",
      },
    ],
  },
  {
    slug: "samsung-green-line-screen-fix-sri-lanka",
    h1: "Samsung Green Line Screen Fix in Sri Lanka (S20, S21, S22 & S23)",
    metaTitle:
      "Samsung Green Line Screen Fix Sri Lanka | S20 S21 S22 S23 | Mobile Genie",
    metaDescription:
      "Fix vertical green and pink lines on Samsung Galaxy S20, S21, S22, S23 & OnePlus phones in Colombo, Sri Lanka with warranty.",
    keywords: [
      "Samsung green line screen fix Sri Lanka",
      "OnePlus green line screen replacement Sri Lanka",
    ],
    readTime: "3 min read",
    summary:
      "Vertical green or pink lines on Galaxy S20, S21, S22, and S23 screens are caused by micro-damage or heat stress on the display flex bonding.",
    sections: [
      {
        heading: "Your Two Repair Options in Colombo",
        body: "We inspect your panel under a microscope before recommending the most cost-effective permanent fix:",
        bullets: [
          "Laser Flex Bonding (when the OLED glass itself is undamaged)",
          "Original Samsung Service Pack AMOLED Replacement (with frame & 1-year warranty)",
        ],
      },
    ],
    faqs: [
      {
        q: "Does resetting the phone fix the green line?",
        a: "No, the green line is a hardware display flex fault, not a software bug. Hardware flex repair or screen replacement is required.",
      },
    ],
  },
  {
    slug: "doorstep-mobile-repair-service-colombo",
    h1: "Doorstep Mobile Repair Service in Colombo & Island-Wide Pickup",
    metaTitle:
      "Doorstep Mobile Repair Service Colombo | Pickup & Delivery Sri Lanka | Mobile Genie",
    metaDescription:
      "Book doorstep mobile repair pickup & delivery in Colombo and insured courier repair across Sri Lanka.",
    keywords: [
      "doorstep mobile repair service Colombo",
      "phone pickup and delivery repair Sri Lanka",
    ],
    readTime: "3 min read",
    summary:
      "Skip Colombo traffic. Schedule a pickup from home or work in Bambalapitiya, Kollupitiya, Nugegoda, or Dehiwala—or ship via insured courier from anywhere in Sri Lanka.",
    sections: [
      {
        heading: "How Pickup & Delivery Works",
        body: "4 simple steps from booking to repaired phone in your hand:",
        bullets: [
          "1. Select your brand and issue on Mobile Genie.",
          "2. Choose your Colombo pickup address & time slot.",
          "3. Receive photo/video diagnostic confirmation before we start.",
          "4. Same-day return delivery with warranty card.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is my phone insured during pickup?",
        a: "Yes, every pickup and island-wide courier booking includes a tamper-evident bag and serial-number receipt.",
      },
    ],
  },
];
