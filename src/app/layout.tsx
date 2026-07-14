import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GharSuraksha - Home Inventory & Insurance Intelligence",
  description:
    "AI-powered home inventory management with insurance policy analysis, coverage gap detection, and intelligent claims generation for Indian households.",
  keywords: [
    "home inventory",
    "insurance",
    "claims",
    "India",
    "household items",
    "coverage analysis",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
