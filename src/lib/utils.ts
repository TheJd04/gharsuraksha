import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export const COVERAGE_STATUS = {
  COVERED: "covered",
  UNCOVERED: "uncovered",
  PARTIAL: "partial",
  UNKNOWN: "unknown",
} as const;

export const ITEM_CONDITIONS = [
  { value: "new", label: "New / Unused" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "poor", label: "Poor / Damaged" },
] as const;

export const POLICY_TYPES = [
  { value: "home", label: "Home Insurance" },
  { value: "contents", label: "Contents Insurance" },
  { value: "fire", label: "Fire Insurance" },
  { value: "car", label: "Car / Motor Insurance" },
  { value: "health", label: "Health Insurance" },
  { value: "life", label: "Life Insurance" },
  { value: "travel", label: "Travel Insurance" },
  { value: "electronics", label: "Electronics Insurance" },
  { value: "jewelry", label: "Jewelry / Valuables Insurance" },
  { value: "shop", label: "Shop / Business Insurance" },
  { value: "other", label: "Other" },
] as const;

export const INCIDENT_TYPES = [
  { value: "theft", label: "Theft / Burglary" },
  { value: "fire", label: "Fire" },
  { value: "flood", label: "Flood / Water Damage" },
  { value: "earthquake", label: "Earthquake" },
  { value: "storm", label: "Storm / Cyclone" },
  { value: "damage", label: "Accidental Damage" },
  { value: "other", label: "Other" },
] as const;

export const ROOMS = [
  "Living Room",
  "Bedroom 1",
  "Bedroom 2",
  "Bedroom 3",
  "Kitchen",
  "Bathroom",
  "Study Room",
  "Dining Room",
  "Balcony",
  "Store Room",
  "Pooja Room",
  "Garage",
  "Garden",
  "Other",
] as const;
