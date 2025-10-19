import { donationItems } from "@/data/items";
import { motion } from "framer-motion";

export const metadata = {
  title: "הדמיית בית הכנסת הבנוי - בונים יחד את בית ה׳"
};

export default function BuiltSynagoguePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <h1 className="font-heading text-4xl text-gold-dark">בית הכנסת הבנוי</h1>
        <p className="max-w-3xl text-neutral-600">
          כאן יוצג מודל תלת ממדי מלא של בית הכנסת לאחר השלמת הבנייה. כל פריט שנרכש יסומן בצבע מיוחד ויופיע עליו שם התורם וההקדשה.
        </p>
        <div className="rounded-3xl border border-gold-light bg-white/80 p-10 text-center text-neutral-500 shadow-lg">
          <p className="text-lg font-semibold text-gold-dark">הדמיה אינטראקטיבית בבנייה</p>
          <p className="mt-2 text-sm">
            השלב הבא יכלול שילוב של Three.js להצגת המודל ותצוגת שכבות יום/לילה.
          </p>
          <div className="mt-6 grid gap-4 text-sm text-neutral-600 md:grid-cols-3">
            <div className="rounded-2xl bg-stone-light/60 p-4">
              🔍 חיפוש הקדשה לפי שם התורם
            </div>
            <div className="rounded-2xl bg-stone-light/60 p-4">
              🧭 ניווט בין אזורי בית הכנסת
            </div>
            <div className="rounded-2xl bg-stone-light/60 p-4">
              🌙 מעבר בין מצבי יום ולילה
            </div>
          </div>
        </div>
      </motion.section>
      <section className="space-y-6">
        <h2 className="section-title">תרומות שכבר נרשמו על ההדמיה</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {donationItems
            .filter(item => item.status === "purchased")
            .map(item => (
              <div key={item.id} className="card space-y-3 p-6">
                <h3 className="font-heading text-xl text-gold-dark">{item.label}</h3>
                <p className="text-sm text-neutral-500">תרומה בסך ₪{item.price.toLocaleString()}</p>
                <div className="rounded-xl bg-gold-light/20 p-4 text-sm text-neutral-600">
                  <p className="font-semibold text-gold-dark">{item.donorName}</p>
                  {item.dedication && <p className="text-xs text-neutral-600">"{item.dedication}"</p>}
                </div>
              </div>
            ))}
        </div>
      </section>
      <section id="contact" className="rounded-3xl border border-gold-light bg-white/80 p-10 shadow-xl">
        <h2 className="section-title">מעוניינים להוסיף שכבה ייחודית להקדשה שלכם?</h2>
        <p className="section-subtitle">
          צוות הסטודיו שלנו יכול לשלב אלמנטים אישיים ייחודיים במודל. השאירו פרטים ונחזור אליכם לתיאום.
        </p>
        <form className="mt-6 grid gap-4 md:grid-cols-2">
          <input type="text" placeholder="שם מלא" className="rounded-xl border border-gold-light bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none" />
          <input type="tel" placeholder="טלפון" className="rounded-xl border border-gold-light bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none" />
          <input type="email" placeholder="אימייל" className="rounded-xl border border-gold-light bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none" />
          <textarea placeholder="מה תרצו להוסיף להקדשה?" rows={4} className="rounded-xl border border-gold-light bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none md:col-span-2" />
          <button className="md:col-span-2 rounded-full bg-gold px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-gold-dark">
            שלחו בקשה
          </button>
        </form>
      </section>
    </div>
  );
}
