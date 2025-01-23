import type { Metadata } from "next";
import { Doto } from "next/font/google";
import "./globals.css";

const doto = Doto({
  subsets: ["latin"],
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
      <body className={`${doto.className}`}>{children}</body>
    </html>
  );
}
