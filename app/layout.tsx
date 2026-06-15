import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/TopNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteDescription =
  "A topsight of the physical sciences: drill from quantities and equations down to units, order-of-magnitude ranges, and the scientists behind them.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sciont.org"),
  title: {
    default: "Scientific Ontology",
    template: "%s",
  },
  description: siteDescription,
  applicationName: "Scientific Ontology",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Scientific Ontology",
    title: "Scientific Ontology",
    description: siteDescription,
  },
  twitter: {
    card: "summary",
    title: "Scientific Ontology",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TopNav />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
