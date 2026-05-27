import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import AppShell from "@/components/layout/AppShell";

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
    <html lang="nl">
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
