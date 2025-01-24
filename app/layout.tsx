import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Doto } from "next/font/google";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const doto = Doto({
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Canada Debt Clock",
  description: "Canada's national debt in real-time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${doto.className} ${ibmPlexMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
