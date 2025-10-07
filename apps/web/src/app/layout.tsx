import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/tuftissimo.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tuftissimo - Tapis Artisanaux sur Mesure",
  description: "Découvrez nos tapis uniques faits main avec la technique du tufting. Créations sur mesure et produits artisanaux de qualité.",
  keywords: "tapis, tufting, artisanal, sur mesure, décoration, fait main",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
