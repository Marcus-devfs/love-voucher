import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Import Google Fonts
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Love Vouchers",
  description: "A special gift for someone special.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.variable,
          playfair.variable,
          "antialiased min-h-screen"
        )}
      >
        {children}
      </body>
    </html>
  );
}
