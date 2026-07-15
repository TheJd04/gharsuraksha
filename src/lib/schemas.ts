import { z } from "zod";

// ─── Auth Schemas ─────────────────────────────────────────────────

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// ─── Item Schemas ─────────────────────────────────────────────────

export const itemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  categoryId: z.string().min(1, "Category is required"),
  brand: z.string().optional().nullable(),
  model: z.string().optional().nullable(),
  estimatedValue: z.coerce.number().min(0, "Value must be positive").default(0),
  room: z.string().optional().nullable(),
  photoUrl: z.string().optional().nullable(),
  purchaseDate: z.string().optional().nullable(),
  condition: z.enum(["new", "good", "fair", "poor"]).default("good"),
  notes: z.string().optional().nullable(),
});

export type ItemFormData = z.infer<typeof itemSchema>;

// ─── Policy Schemas ───────────────────────────────────────────────

export const policySchema = z.object({
  provider: z.string().min(1, "Insurance provider is required"),
  policyNumber: z.string().optional().nullable(),
  type: z.string().min(1, "Policy type is required"),
  sumInsured: z.coerce.number().min(0).default(0),
  premium: z.coerce.number().min(0).default(0),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  rawText: z.string().optional().nullable(),
  documentUrl: z.string().optional().nullable(),
});

export type PolicyFormData = z.infer<typeof policySchema>;

// ─── Claim Schemas ────────────────────────────────────────────────

export const claimSchema = z.object({
  title: z.string().min(1, "Claim title is required"),
  incidentType: z.string().min(1, "Incident type is required"),
  incidentDate: z.string().min(1, "Incident date is required"),
  description: z.string().optional().nullable(),
  itemIds: z.array(z.string()).min(1, "Select at least one item"),
});

export type ClaimFormData = z.infer<typeof claimSchema>;

// ─── AI Response Schemas ──────────────────────────────────────────

export const aiCatalogSchema = z.object({
  name: z.string().describe("Name of the item identified in the photo"),
  category: z.string().describe("Category of the item (e.g., Electronics & Appliances, Furniture, Kitchen & Cookware)"),
  brand: z.string().optional().describe("Brand name if visible"),
  model: z.string().optional().describe("Model name/number if visible"),
  estimatedValue: z.number().describe("Estimated current market value in Indian Rupees (INR)"),
  condition: z.enum(["new", "good", "fair", "poor"]).describe("Condition of the item"),
  description: z.string().describe("Brief description of the item"),
});

export const aiPolicyParseSchema = z.object({
  provider: z.string().describe("Insurance company name"),
  policyNumber: z.string().optional().describe("Policy number"),
  type: z.string().describe("Type of insurance (home, car, health, life, fire, etc.)"),
  sumInsured: z.number().describe("Total sum insured in INR"),
  premium: z.number().describe("Annual premium in INR"),
  startDate: z.string().optional().describe("Policy start date (YYYY-MM-DD)"),
  endDate: z.string().optional().describe("Policy end date (YYYY-MM-DD)"),
  coverages: z.array(z.object({
    coverageType: z.string().describe("Type of coverage (structure, contents, electronics, valuables, etc.)"),
    description: z.string().describe("Description of what is covered"),
    coverageLimit: z.number().describe("Maximum coverage amount in INR"),
    deductible: z.number().default(0).describe("Deductible amount in INR"),
    exclusions: z.array(z.string()).describe("List of exclusions for this coverage"),
    coveredCategories: z.array(z.string()).describe("Categories of items covered"),
  })).describe("List of coverage sections in the policy"),
  keyExclusions: z.array(z.string()).describe("Major policy-wide exclusions"),
  warnings: z.array(z.string()).describe("Important warnings, traps, or loopholes the policyholder should know about"),
});

export const aiGapAnalysisSchema = z.object({
  totalInventoryValue: z.number().describe("Total value of all inventory items"),
  totalCoveredValue: z.number().describe("Total value of covered items"),
  totalUncoveredValue: z.number().describe("Total value of uncovered items"),
  coveragePercentage: z.number().describe("Percentage of inventory value that is covered"),
  coveredItems: z.array(z.object({
    itemName: z.string(),
    itemValue: z.number(),
    coveredBy: z.string().describe("Which policy covers this item"),
    coverageLimit: z.number(),
  })).describe("Items that are covered by existing policies"),
  uncoveredItems: z.array(z.object({
    itemName: z.string(),
    itemValue: z.number(),
    reason: z.string().describe("Why this item is not covered"),
    recommendation: z.string().describe("What coverage to get"),
  })).describe("Items that are NOT covered"),
  underinsuredItems: z.array(z.object({
    itemName: z.string(),
    itemValue: z.number(),
    currentCoverage: z.number(),
    gap: z.number(),
  })).describe("Items where coverage is less than value"),
  recommendations: z.array(z.string()).describe("Overall recommendations to improve coverage"),
});

export type AICatalogResult = z.infer<typeof aiCatalogSchema>;
export type AIPolicyParseResult = z.infer<typeof aiPolicyParseSchema>;
export type AIGapAnalysisResult = z.infer<typeof aiGapAnalysisSchema>;
