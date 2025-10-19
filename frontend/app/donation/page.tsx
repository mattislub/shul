import { DonationGrid } from "@/components/DonationGrid";
import { motion } from "framer-motion";

export const metadata = {
  title: "בחרו את חלקכם בבניין - בונים יחד את בית ה׳"
};

export default function DonationPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <h1 className="font-heading text-4xl text-gold-dark">בחרו את החלק שלכם בבניית בית הכנסת</h1>
        <p className="max-w-3xl text-neutral-600">
          לחצו על פריט פנוי כדי להוסיף הקדשה אישית ולהמשיך לתרומה מאובטחת. מצב הפריטים מתעדכן בזמן אמת ומסומן בצבעים ברורים.
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2">
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            פנוי לתרומה
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2">
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            בתהליך השלמת תרומה
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2">
            <span className="h-3 w-3 rounded-full bg-neutral-400" />
            נרכש ומוצג בהדמיה
          </span>
        </div>
      </motion.div>
      <DonationGrid />
    </div>
  );
}
