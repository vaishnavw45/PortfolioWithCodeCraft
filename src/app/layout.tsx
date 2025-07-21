import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const fontHeadline = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-headline",
});


export const metadata: Metadata = {
  title: 'Vaishnav Wakchaure | System Engineer Portfolio',
  description: 'Portfolio of Vaishnav Wakchaure — Passionate about Linux, Networking, Cloud, and Cybersecurity.',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={cn(
          "font-body bg-background text-foreground antialiased cursor-crosshair",
          fontBody.variable,
          fontHeadline.variable
        )}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
