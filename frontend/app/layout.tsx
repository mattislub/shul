import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "בונים יחד את בית ה'",
  description: "פלטפורמה חווייתית לתרומות לבניית בית הכנסת החדש",
  keywords: [
    "תרומה",
    "בית כנסת",
    "קהילה",
    "הקדשות",
    "בניה"
  ],
  openGraph: {
    title: "בונים יחד את בית ה'",
    description: "בחרו את חלקכם בבניית בית הכנסת והוסיפו הקדשה מרגשת",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="bg-textured">
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 px-4 pb-16 pt-24 md:px-12 lg:px-20 xl:px-32">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
