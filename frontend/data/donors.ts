export interface DonorRecord {
  id: string;
  donorName: string;
  dedication?: string;
  item: string;
  amount: number;
  public: boolean;
  date: string;
}

export const donors: DonorRecord[] = [
  {
    id: "1",
    donorName: "משפחת כהן",
    dedication: "לע"נ יעקב בן שרה",
    item: "אבן שער הכניסה",
    amount: 1500,
    public: true,
    date: "2024-02-14"
  },
  {
    id: "2",
    donorName: "קהילת לב אחד",
    dedication: "לרפואת תומר בן עליזה",
    item: "חלון ויטראז׳ מרכזי",
    amount: 3600,
    public: true,
    date: "2024-02-10"
  },
  {
    id: "3",
    donorName: "משפחת אמסלם",
    dedication: "באהבה מהנכדים",
    item: "אריח במה",
    amount: 320,
    public: false,
    date: "2024-02-08"
  }
];
