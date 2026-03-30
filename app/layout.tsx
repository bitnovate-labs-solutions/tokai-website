import { PrismicPreview } from "@prismicio/next";
import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";

import { isPrismicConfigured, repositoryName } from "@/lib/prismicio";

import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tokai — Lightning, Solar & Security",
    template: "%s · Tokai",
  },
  description:
    "Tokai Engineering: lightning and surge protection, solar solutions, and integrated security for Malaysia since 1993.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = isPrismicConfigured() ? (
    <PrismicPreview repositoryName={repositoryName}>{children}</PrismicPreview>
  ) : (
    children
  );

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#f7f6f3] text-zinc-950">
        {content}
      </body>
    </html>
  );
}
