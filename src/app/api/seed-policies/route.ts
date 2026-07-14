import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;

    // Sample Car Insurance
    await prisma.policy.create({
      data: {
        userId,
        provider: "Tata AIG General Insurance",
        policyNumber: "CAR-93821-2023",
        type: "car",
        sumInsured: 850000,
        premium: 12500,
        status: "active",
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        parsedData: {
          keyExclusions: ["Drunk driving", "Driving without license", "Wear and tear"],
          warnings: ["Depreciation applies to plastic and rubber parts", "No claim bonus resets if claim is made"]
        },
        coverages: {
          create: [
            {
              coverageType: "Own Damage",
              description: "Covers damage to the vehicle due to accidents, fire, theft, natural disasters.",
              coverageLimit: 850000,
              deductible: 2000,
              exclusions: ["Engine water ingression unless add-on present"],
            },
            {
              coverageType: "Third Party Liability",
              description: "Covers bodily injury and property damage to third parties.",
              coverageLimit: 750000,
              deductible: 0,
            }
          ]
        }
      }
    });

    // Sample Home Insurance
    await prisma.policy.create({
      data: {
        userId,
        provider: "HDFC ERGO",
        policyNumber: "HOME-4029-A",
        type: "home",
        sumInsured: 5000000,
        premium: 4500,
        status: "active",
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        parsedData: {
          keyExclusions: ["Damage due to war", "Damage due to intentional acts"],
          warnings: ["Ensure FIR is filed for theft claims within 24 hours", "Valuables over 1L need separate declaration"]
        },
        coverages: {
          create: [
            {
              coverageType: "Building Structure",
              description: "Covers the physical structure of the house against fire, earthquake, etc.",
              coverageLimit: 4000000,
              deductible: 10000,
            },
            {
              coverageType: "Contents Coverage",
              description: "Covers household appliances, furniture, and personal belongings.",
              coverageLimit: 1000000,
              deductible: 5000,
              coveredCategories: ["Electronics", "Furniture", "Appliances"],
            }
          ]
        }
      }
    });

    // Sample TV Insurance / Electronics Extended Warranty
    await prisma.policy.create({
      data: {
        userId,
        provider: "Reliance General / Croma Protect",
        policyNumber: "EW-TV-55-901",
        type: "electronics",
        sumInsured: 65000,
        premium: 3200,
        status: "active",
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
        parsedData: {
          keyExclusions: ["Physical damage", "Water damage", "Unauthorized repair"],
          warnings: ["Warranty voids if serial number is tampered"]
        },
        coverages: {
          create: [
            {
              coverageType: "Extended Warranty - TV",
              description: "Covers mechanical and electrical breakdowns after manufacturer warranty expires.",
              coverageLimit: 65000,
              deductible: 0,
              coveredCategories: ["Electronics", "TV"],
            }
          ]
        }
      }
    });
    
    // Sample Bike Insurance
    await prisma.policy.create({
      data: {
        userId,
        provider: "ICICI Lombard",
        policyNumber: "BIKE-2940-X",
        type: "bike",
        sumInsured: 95000,
        premium: 2100,
        status: "active",
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        parsedData: {
          keyExclusions: ["Commercial use of private bike"],
          warnings: ["Requires valid driving license during accident"]
        },
        coverages: {
          create: [
            {
              coverageType: "Comprehensive Cover",
              description: "Covers own damage and third party liability.",
              coverageLimit: 95000,
              deductible: 500,
            }
          ]
        }
      }
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error generating sample policies:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
