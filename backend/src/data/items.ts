export type ItemStatus = "available" | "reserved" | "purchased";

export interface Item {
  id: string;
  name: string;
  category: string;
  price: number;
  status: ItemStatus;
  dedication?: string;
  donorName?: string;
  public?: boolean;
}

export const items: Item[] = [
  {
    id: "stone-1",
    name: "אבן פינת החזית",
    category: "אבן",
    price: 1800,
    status: "available"
  },
  {
    id: "stone-2",
    name: "אבן שער הכניסה",
    category: "אבן",
    price: 1500,
    status: "purchased",
    dedication: "לע"נ משפחת כהן",
    donorName: "משפחת כהן",
    public: true
  },
  {
    id: "chair-1",
    name: "כיסא עזרת גברים",
    category: "כיסא",
    price: 720,
    status: "available"
  },
  {
    id: "chair-2",
    name: "כיסא עזרת נשים",
    category: "כיסא",
    price: 720,
    status: "reserved",
    donorName: "משפחת ישראלי",
    public: false
  },
  {
    id: "window-1",
    name: "חלון ויטראז׳ מרכזי",
    category: "חלון",
    price: 3600,
    status: "purchased",
    dedication: "לרפואת תומר בן עליזה",
    donorName: "קהילת לב אחד",
    public: true
  }
];
