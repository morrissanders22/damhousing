import type { Metadata } from "next";
import { Inter_Tight, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import AppShell from "@/components/layout/AppShell";

// Same fonts as the base44 site. next/font self-hosts them and exposes them as
// the --font-body / --font-display CSS variables the design already uses.
const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-body",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Dam Housing",
  description:
    "Dam Housing — makelaardij in Amsterdam. Verkoop, aankoop, verhuur en taxatie van woningen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${interTight.variable} ${dmSerifDisplay.variable}`}>
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
