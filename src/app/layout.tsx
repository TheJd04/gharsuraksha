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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
