import type { Metadata } from "next";
import { VT323, Black_Ops_One, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  variable: "--font-vt323",
  subsets: ["latin"],
});

const blackOps = Black_Ops_One({
  weight: "400",
  variable: "--font-black-ops",
  subsets: ["latin"],
});

const shareTech = Share_Tech_Mono({
  weight: "400",
  variable: "--font-share-tech",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CS 1.6 C4 Simulator",
  description: "C4 Bomb Simulator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${vt323.variable} ${blackOps.variable} ${shareTech.variable} antialiased bg-stone-900 text-stone-100 overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
