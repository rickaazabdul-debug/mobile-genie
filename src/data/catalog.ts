export interface RepairService {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  turnaround: string;
  warranty: string;
  iconName: "smartphone" | "battery" | "plug" | "droplets" | "camera" | "shield";
  popular?: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: "Smartphones" | "Accessories";
  condition: "New" | "Certified Refurbished" | "Accessory";
  price: number;
  originalPrice?: number;
  specs: string;
  rating: number;
  badgeColor: string;
}

export const REPAIR_SERVICES: RepairService[] = [
  {
    id: "screen-replacement",
    title: "OLED & Glass Screen Repair",
    description:
      "Factory-calibrated OLED and LCD display replacements with True Tone and Face ID preservation.",
    startingPrice: 79,
    turnaround: "30–45 mins",
    warranty: "Lifetime Warranty",
    iconName: "smartphone",
    popular: true,
  },
  {
    id: "battery-swap",
    title: "High-Capacity Battery Swap",
    description:
      "Zero-cycle OEM-grade battery replacement to restore all-day power and peak performance.",
    startingPrice: 49,
    turnaround: "20–30 mins",
    warranty: "1-Year Warranty",
    iconName: "battery",
    popular: true,
  },
  {
    id: "charging-port",
    title: "Charging Port & USB-C Fix",
    description:
      "Micro-soldered USB-C and Lightning port replacements, plus ultrasonic debris cleaning.",
    startingPrice: 59,
    turnaround: "45 mins",
    warranty: "90-Day Warranty",
    iconName: "plug",
  },
  {
    id: "water-damage",
    title: "Liquid & Water Recovery",
    description:
      "Ultrasonic logic board cleaning, corrosion removal, and emergency data recovery.",
    startingPrice: 89,
    turnaround: "Same Day",
    warranty: "90-Day Warranty",
    iconName: "droplets",
  },
  {
    id: "camera-repair",
    title: "Camera & Sapphire Lens Fix",
    description:
      "Restore crystal-clear focus, OIS stabilization, and cracked rear camera glass.",
    startingPrice: 69,
    turnaround: "40 mins",
    warranty: "90-Day Warranty",
    iconName: "camera",
  },
  {
    id: "diagnostics-unlock",
    title: "Diagnostics & Carrier Unlock",
    description:
      "Full 32-point hardware health check, software restoration, and official carrier unlocking.",
    startingPrice: 29,
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
    price: 999,
    specs: "6.3\" ProMotion OLED • A18 Pro • Unlocked",
    rating: 4.9,
    badgeColor: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  },
  {
    id: "galaxy-s25-ultra",
    name: "Galaxy S25 Ultra (512GB)",
    brand: "Samsung",
    category: "Smartphones",
    condition: "New",
    price: 1149,
    specs: "6.9\" QHD+ AMOLED • S-Pen • 200MP Camera",
    rating: 4.9,
    badgeColor: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  },
  {
    id: "iphone-15-refurb",
    name: "iPhone 15 (128GB)",
    brand: "Apple",
    category: "Smartphones",
    condition: "Certified Refurbished",
    price: 549,
    originalPrice: 699,
    specs: "95%+ Battery Health • 1-Yr Genie Warranty",
    rating: 4.8,
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  {
    id: "pixel-9-pro",
    name: "Google Pixel 9 Pro (256GB)",
    brand: "Google",
    category: "Smartphones",
    condition: "Certified Refurbished",
    price: 679,
    originalPrice: 899,
    specs: "Tensor G4 • Triple Pro Camera • Unlocked",
    rating: 4.8,
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  {
    id: "genie-gan-65w",
    name: "GenieCharge 65W GaN Dual USB-C",
    brand: "Mobile Genie",
    category: "Accessories",
    condition: "Accessory",
    price: 39,
    originalPrice: 49,
    specs: "PD 3.0 Fast Charge • Foldable Plug • Braided Cable",
    rating: 4.9,
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
  {
    id: "magsafe-kevlar-case",
    name: "AeroShield MagSafe Aramid Case",
    brand: "Mobile Genie",
    category: "Accessories",
    condition: "Accessory",
    price: 34,
    specs: "10ft Drop Protection • Ultra-Slim • N52 Magnets",
    rating: 4.7,
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
  {
    id: "sapphire-glass",
    name: "9H Sapphire Edge Screen Guard",
    brand: "Mobile Genie",
    category: "Accessories",
    condition: "Accessory",
    price: 24,
    specs: "Free In-Store Dust-Free Install • Anti-Fingerprint",
    rating: 4.8,
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
  {
    id: "genie-pods-anc",
    name: "GeniePods Pro ANC Earbuds",
    brand: "Mobile Genie",
    category: "Accessories",
    condition: "Accessory",
    price: 89,
    originalPrice: 119,
    specs: "42dB Active Noise Canceling • 36h Battery • USB-C",
    rating: 4.8,
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
];

export const DEVICE_BRANDS = [
  "Apple iPhone",
  "Samsung Galaxy",
  "Google Pixel",
  "OnePlus",
  "Xiaomi / Redmi",
  "iPad / Tablet",
  "Other Device",
];
