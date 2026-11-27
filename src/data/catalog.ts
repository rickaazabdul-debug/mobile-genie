export interface RepairService {
  id: string;
  title: string;
  shortLabel: string;
  description: string;
  startingPrice: number;
  turnaround: string;
  warranty: string;
  iconName: "smartphone" | "battery" | "plug" | "droplets" | "camera" | "shield";
  popular?: boolean;
}

export interface PhoneBrand {
  id: string;
  name: string;
  displayText: string;
  accentColor: string;
  bgTint: string;
  textStyle: string;
  popularModels: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: "Phone Parts" | "Smartphones" | "Accessories";
  condition:
    | "Genuine Part"
    | "OEM Part"
    | "New"
    | "Certified Refurbished"
    | "Accessory";
  price: number;
  originalPrice?: number;
  specs: string;
  rating: number;
  badgeColor: string;
  imageUrl?: string;
  inStock?: boolean;
}

export function formatLkr(amount: number): string {
  return `LKR ${amount.toLocaleString("en-LK")}`;
}

export const PHONE_BRANDS: PhoneBrand[] = [
  {
    id: "samsung",
    name: "Samsung",
    displayText: "SAMSUNG",
    accentColor: "#1428A0",
    bgTint: "bg-blue-50",
    textStyle: "font-extrabold tracking-widest text-[#1428A0]",
    popularModels: ["Galaxy S24 Ultra", "Galaxy S23", "Galaxy A54", "Galaxy Z Flip 5"],
  },
  {
    id: "apple",
    name: "Apple",
    displayText: "Apple",
    accentColor: "#111827",
    bgTint: "bg-slate-100",
    textStyle: "font-bold tracking-tight text-slate-900",
    popularModels: ["iPhone 16 Pro", "iPhone 15", "iPhone 14 Pro", "iPhone 13"],
  },
  {
    id: "oneplus",
    name: "OnePlus",
    displayText: "ONEPLUS",
    accentColor: "#F5010C",
    bgTint: "bg-red-50",
    textStyle: "font-bold tracking-wider text-[#F5010C]",
    popularModels: ["OnePlus 12", "OnePlus 11", "OnePlus Nord 4", "OnePlus Open"],
  },
  {
    id: "nokia",
    name: "Nokia",
    displayText: "NOKIA",
    accentColor: "#124191",
    bgTint: "bg-blue-50",
    textStyle: "font-black tracking-widest text-[#124191]",
    popularModels: ["Nokia XR21", "Nokia G42", "Nokia X30", "Nokia C32"],
  },
  {
    id: "vivo",
    name: "Vivo",
    displayText: "vivo",
    accentColor: "#0072CE",
    bgTint: "bg-sky-50",
    textStyle: "font-bold tracking-wide text-[#0072CE]",
    popularModels: ["Vivo X100 Pro", "Vivo V30", "Vivo Y200", "Vivo T3"],
  },
  {
    id: "google",
    name: "Google",
    displayText: "Google",
    accentColor: "#4285F4",
    bgTint: "bg-sky-50",
    textStyle: "font-bold tracking-tight text-[#4285F4]",
    popularModels: ["Pixel 9 Pro", "Pixel 8a", "Pixel 8", "Pixel 7 Pro"],
  },
  {
    id: "realme",
    name: "Realme",
    displayText: "realme",
    accentColor: "#D97706",
    bgTint: "bg-amber-50",
    textStyle: "font-bold tracking-normal text-amber-600",
    popularModels: ["Realme GT 6", "Realme 12 Pro+", "Realme Narzo 70", "Realme C67"],
  },
  {
    id: "poco",
    name: "POCO",
    displayText: "POCO",
    accentColor: "#EAB308",
    bgTint: "bg-yellow-50",
    textStyle: "font-black tracking-wider text-yellow-600",
    popularModels: ["POCO F6", "POCO X6 Pro", "POCO M6 Pro", "POCO C65"],
  },
  {
    id: "xiaomi",
    name: "Xiaomi",
    displayText: "MI",
    accentColor: "#FF6900",
    bgTint: "bg-orange-50",
    textStyle: "font-black tracking-widest text-[#FF6900]",
    popularModels: ["Xiaomi 14", "Redmi Note 13 Pro", "Redmi 13C", "Xiaomi 13T"],
  },
  {
    id: "motorola",
    name: "Motorola",
    displayText: "motorola",
    accentColor: "#E11D48",
    bgTint: "bg-rose-50",
    textStyle: "font-bold tracking-tight text-slate-900",
    popularModels: ["Moto Edge 50", "Moto G84", "Razr 40 Ultra", "Moto G54"],
  },
  {
    id: "zte",
    name: "ZTE",
    displayText: "ZTE",
    accentColor: "#00AEEF",
    bgTint: "bg-cyan-50",
    textStyle: "font-black tracking-wider text-[#00AEEF]",
    popularModels: ["ZTE Axon 50", "Nubia Z60 Ultra", "ZTE Blade V50", "RedMagic 9 Pro"],
  },
  {
    id: "huawei",
    name: "Huawei",
    displayText: "HUAWEI",
    accentColor: "#CF0A2C",
    bgTint: "bg-red-50",
    textStyle: "font-extrabold tracking-wider text-[#CF0A2C]",
    popularModels: ["Huawei Pura 70", "Huawei Mate 60", "Huawei Nova 12", "Huawei P60 Pro"],
  },
  {
    id: "nothing",
    name: "Nothing",
    displayText: "NOTHING",
    accentColor: "#111827",
    bgTint: "bg-slate-100",
    textStyle: "font-mono font-bold tracking-[0.2em] text-slate-900",
    popularModels: ["Nothing Phone (2a)", "Nothing Phone (2)", "Nothing Phone (1)", "CMF Phone 1"],
  },
  {
    id: "umidigi",
    name: "UMIDIGI",
    displayText: "UMIDIGI",
    accentColor: "#CA8A04",
    bgTint: "bg-amber-50",
    textStyle: "font-extrabold tracking-wide text-amber-700",
    popularModels: ["UMIDIGI A15", "UMIDIGI Bison GT2", "UMIDIGI G9", "UMIDIGI F3"],
  },
  {
    id: "oppo",
    name: "OPPO",
    displayText: "oppo",
    accentColor: "#047857",
    bgTint: "bg-emerald-50",
    textStyle: "font-bold tracking-widest text-[#047857]",
    popularModels: ["OPPO Find X7", "OPPO Reno 12", "OPPO A79", "OPPO Find N3"],
  },
  {
    id: "honor",
    name: "HONOR",
    displayText: "HONOR",
    accentColor: "#2563EB",
    bgTint: "bg-indigo-50",
    textStyle: "font-extrabold tracking-wider text-[#2563EB]",
    popularModels: ["HONOR Magic6 Pro", "HONOR 200 Pro", "HONOR X9b", "HONOR 90"],
  },
  {
    id: "tcl",
    name: "TCL",
    displayText: "TCL",
    accentColor: "#E31E24",
    bgTint: "bg-red-50",
    textStyle: "font-black tracking-wider text-[#E31E24]",
    popularModels: ["TCL 50 XL", "TCL 40 NXTPAPER", "TCL 30 XE", "TCL Stylus 5G"],
  },
];

export const APPOINTMENT_TIME_SLOTS = [
  "09:30 AM",
  "11:00 AM",
  "12:30 PM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
  "06:30 PM",
];

export interface PartTierOption {
  id: "original" | "oem" | "economy";
  name: string;
  badge: string;
  warranty: string;
  multiplier: number;
  description: string;
  badgeClass: string;
}

export const PART_TIERS: PartTierOption[] = [
  {
    id: "original",
    name: "Original / Service Pack",
    badge: "1-Year Warranty",
    warranty: "1-Year Official Parts Warranty",
    multiplier: 1.45,
    description:
      "Factory-grade brightness, 120Hz support, True Tone & lowest battery draw.",
    badgeClass: "bg-red-50 text-[#E31E24] border-red-200",
  },
  {
    id: "oem",
    name: "OEM Pulled / Soft-OLED",
    badge: "6-Month Warranty",
    warranty: "6-Month Mobile Genie Warranty",
    multiplier: 1.0,
    description:
      "Flexible OLED/OEM quality with balanced pricing and full touch accuracy.",
    badgeClass: "bg-sky-50 text-[#1D8FE1] border-sky-200",
  },
  {
    id: "economy",
    name: "Standard / Economy",
    badge: "90-Day Warranty",
    warranty: "90-Day Replacement Warranty",
    multiplier: 0.78,
    description:
      "Budget-friendly option ideal for older devices or quick data recovery.",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
];

export type ServiceModeId = "walk-in" | "pickup" | "doorstep";

export interface ServiceModeOption {
  id: ServiceModeId;
  label: string;
  sublabel: string;
  feeLkr: number;
}

export const SERVICE_MODES: ServiceModeOption[] = [
  {
    id: "walk-in",
    label: "Walk-In (Colombo Lab)",
    sublabel: "Drop off at Bambalapitiya • 30-min express wait",
    feeLkr: 0,
  },
  {
    id: "pickup",
    label: "Home / Office Pickup & Delivery",
    sublabel: "Insured rider collects & returns same day",
    feeLkr: 650,
  },
  {
    id: "doorstep",
    label: "Doorstep Technician Visit",
    sublabel: "On-site screen/battery repair at your location",
    feeLkr: 1500,
  },
];

export const COLOMBO_POSTAL_ZONES = [
  "Colombo 01 (Fort)",
  "Colombo 02 (Slave Island)",
  "Colombo 03 (Kollupitiya)",
  "Colombo 04 (Bambalapitiya)",
  "Colombo 05 (Havelock / Kirulapone)",
  "Colombo 06 (Wellawatte)",
  "Colombo 07 (Cinnamon Gardens)",
  "Colombo 08 (Borella)",
  "Colombo 09 (Dematagoda)",
  "Colombo 10 (Maradana)",
  "Colombo 11 (Pettah)",
  "Colombo 12 (Hulftsdorp)",
  "Colombo 13 (Kotahena)",
  "Colombo 14 (Grandpass)",
  "Colombo 15 (Mutwal)",
  "Dehiwala",
  "Mount Lavinia",
  "Nugegoda",
  "Maharagama",
  "Rajagiriya",
  "Battaramulla",
  "Wattala",
  "Moratuwa",
];

export const SLOT_STATUS: Record<
  string,
  { label: string; available: boolean; urgent?: boolean }
> = {
  "09:30 AM": { label: "Available", available: true },
  "11:00 AM": { label: "2 left", available: true, urgent: true },
  "12:30 PM": { label: "Available", available: true },
  "02:00 PM": { label: "1 left", available: true, urgent: true },
  "03:30 PM": { label: "Available", available: true },
  "05:00 PM": { label: "Available", available: true },
  "06:30 PM": { label: "1 left", available: true, urgent: true },
};

const SPECIAL_ORDER_BRANDS = new Set(["zte", "umidigi", "tcl", "motorola"]);

export function getPartsAvailability(
  brandId: string,
  tierId: PartTierOption["id"]
): {
  status: "In Stock" | "Limited Stock" | "Special Order (24h)";
  badgeClass: string;
  note: string;
} {
  if (SPECIAL_ORDER_BRANDS.has(brandId) && tierId === "original") {
    return {
      status: "Special Order (24h)",
      badgeClass: "border-amber-200 bg-amber-50 text-amber-800",
      note: "Part requires 24h express sourcing from our Colombo warehouse before repair.",
    };
  }
  if (SPECIAL_ORDER_BRANDS.has(brandId)) {
    return {
      status: "Limited Stock",
      badgeClass: "border-sky-200 bg-sky-50 text-[#1D8FE1]",
      note: "Available in limited quantities — booking reserves the part for your slot.",
    };
  }
  return {
    status: "In Stock",
    badgeClass: "border-emerald-200 bg-emerald-50 text-emerald-700",
    note: "Ready at our Colombo repair lab for same-day 30–45 min service.",
  };
}

export function generateTicketCode(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `REP-${num}`;
}

export const REPAIR_SERVICES: RepairService[] = [
  {
    id: "screen-replacement",
    title: "Screen & Glass Replacement",
    shortLabel: "Cracked Screen",
    description:
      "Factory-calibrated OLED & LCD display replacements with True Tone and fingerprint sensor preservation.",
    startingPrice: 14500,
    turnaround: "30–45 mins",
    warranty: "Lifetime Warranty",
    iconName: "smartphone",
    popular: true,
  },
  {
    id: "battery-swap",
    title: "Battery Replacement",
    shortLabel: "Battery Drain",
    description:
      "Zero-cycle OEM-grade battery replacement to restore all-day power and peak performance.",
    startingPrice: 6500,
    turnaround: "20–30 mins",
    warranty: "1-Year Warranty",
    iconName: "battery",
    popular: true,
  },
  {
    id: "charging-port",
    title: "Charging Port & USB-C Fix",
    shortLabel: "Charging Port",
    description:
      "Micro-soldered USB-C and Lightning port replacements, plus ultrasonic debris cleaning.",
    startingPrice: 4500,
    turnaround: "45 mins",
    warranty: "90-Day Warranty",
    iconName: "plug",
  },
  {
    id: "water-damage",
    title: "Water & Liquid Damage",
    shortLabel: "Water Damage",
    description:
      "Ultrasonic logic board cleaning, corrosion removal, and emergency data recovery.",
    startingPrice: 7500,
    turnaround: "Same Day",
    warranty: "90-Day Warranty",
    iconName: "droplets",
  },
  {
    id: "camera-repair",
    title: "Camera & Lens Repair",
    shortLabel: "Camera / Lens",
    description:
      "Restore crystal-clear focus, OIS stabilization, and cracked rear camera glass.",
    startingPrice: 5500,
    turnaround: "40 mins",
    warranty: "90-Day Warranty",
    iconName: "camera",
  },
  {
    id: "diagnostics-unlock",
    title: "Diagnostics & Software Fix",
    shortLabel: "Diagnostics / Unlock",
    description:
      "Full 32-point hardware health check, software restoration, and official carrier unlocking.",
    startingPrice: 2500,
    turnaround: "20 mins",
    warranty: "Service Guarantee",
    iconName: "shield",
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    id: "iphone-16-pro",
    name: "iPhone 16 Pro (256GB)",
    brand: "Apple",
    category: "Smartphones",
    condition: "New",
    price: 329000,
    specs: "6.3\" ProMotion OLED • A18 Pro • Unlocked",
    rating: 4.9,
    badgeColor: "bg-red-50 text-[#E31E24] border-red-200",
  },
  {
    id: "galaxy-s25-ultra",
    name: "Galaxy S25 Ultra (512GB)",
    brand: "Samsung",
    category: "Smartphones",
    condition: "New",
    price: 369000,
    specs: "6.9\" QHD+ AMOLED • S-Pen • 200MP Camera",
    rating: 4.9,
    badgeColor: "bg-sky-50 text-[#1D8FE1] border-sky-200",
  },
  {
    id: "iphone-15-refurb",
    name: "iPhone 15 (128GB)",
    brand: "Apple",
    category: "Smartphones",
    condition: "Certified Refurbished",
    price: 179000,
    originalPrice: 219000,
    specs: "95%+ Battery Health • 1-Yr Genie Warranty",
    rating: 4.8,
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "pixel-9-pro",
    name: "Google Pixel 9 Pro (256GB)",
    brand: "Google",
    category: "Smartphones",
    condition: "Certified Refurbished",
    price: 215000,
    originalPrice: 265000,
    specs: "Tensor G4 • Triple Pro Camera • Unlocked",
    rating: 4.8,
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "genie-gan-65w",
    name: "GenieCharge 65W GaN Dual USB-C",
    brand: "Mobile Genie",
    category: "Accessories",
    condition: "Accessory",
    price: 9500,
    originalPrice: 12500,
    specs: "PD 3.0 Fast Charge • Foldable Plug • Braided Cable",
    rating: 4.9,
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: "magsafe-kevlar-case",
    name: "AeroShield MagSafe Aramid Case",
    brand: "Mobile Genie",
    category: "Accessories",
    condition: "Accessory",
    price: 7900,
    specs: "10ft Drop Protection • Ultra-Slim • N52 Magnets",
    rating: 4.7,
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: "sapphire-glass",
    name: "9H Sapphire Edge Screen Guard",
    brand: "Mobile Genie",
    category: "Accessories",
    condition: "Accessory",
    price: 4500,
    specs: "Free In-Store Dust-Free Install • Anti-Fingerprint",
    rating: 4.8,
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: "genie-pods-anc",
    name: "GeniePods Pro ANC Earbuds",
    brand: "Mobile Genie",
    category: "Accessories",
    condition: "Accessory",
    price: 22500,
    originalPrice: 29500,
    specs: "42dB Active Noise Canceling • 36h Battery • USB-C",
    rating: 4.8,
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
];
