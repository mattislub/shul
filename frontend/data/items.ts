export type DonationStatus = "available" | "reserved" | "purchased";

export interface DonationItem {
  id: string;
  label: string;
  category: "אבן" | "כיסא" | "חלון" | "פרוכת" | "אריח";
  price: number;
  status: DonationStatus;
  dedication?: string;
  donorName?: string;
}

export const donationItems: DonationItem[] = [
  {
    id: "stone-1",
    label: "אבן פינת החזית",
    category: "אבן",
    price: 1800,
    status: "available"
  },
  {
    id: "stone-2",
    label: "אבן שער הכניסה",
    category: "אבן",
    price: 1500,
    status: "purchased",
    dedication: "לע"נ משפחת כהן",
    donorName: "משפחת כהן"
  },
  {
    id: "chair-1",
    label: "כיסא עזרת גברים",
    category: "כיסא",
    price: 720,
    status: "available"
  },
  {
    id: "chair-2",
    label: "כיסא עזרת נשים",
    category: "כיסא",
    price: 720,
    status: "reserved",
    donorName: "משפחת ישראלי"
  },
  {
    id: "window-1",
    label: "חלון ויטראז׳ מרכזי",
    category: "חלון",
    price: 3600,
    status: "purchased",
    dedication: "לרפואת תומר בן עליזה",
    donorName: "קהילת לב אחד"
  },
  {
    id: "parochet-1",
    label: "פרוכת ראשית",
    category: "פרוכת",
    price: 5400,
    status: "available"
  },
  {
    id: "tile-1",
    label: "אריח רצפה",
    category: "אריח",
    price: 260,
    status: "available"
  },
  {
    id: "tile-2",
    label: "אריח במה",
    category: "אריח",
    price: 320,
    status: "purchased",
    dedication: "באהבה מהנכדים",
    donorName: "משפחת אמסלם"
  }
];
