import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative mx-auto flex max-w-6xl flex-col gap-12 rounded-[2.5rem] border border-white/40 bg-gradient-to-br from-white via-white/90 to-stone-light/90 p-10 shadow-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <p className="inline-flex rounded-full bg-gold-light/30 px-4 py-1 text-sm font-medium text-gold-dark shadow-sm">
          קמפיין התרומות נפתח - הצטרפו אלינו!
        </p>
        <h1 className="font-heading text-4xl leading-tight text-gold-dark md:text-5xl">
          בואו לבחור את חלקכם בבניית בית הכנסת החדש
        </h1>
        <p className="max-w-2xl text-lg text-neutral-600">
          חוויית תרומה אינטראקטיבית שמאפשרת לכם לראות, לבחור ולהקדיש את הפריט המדויק עליו אתם תורמים. אבני הבניין, הכיסאות והחלונות מחכים לשמותיכם.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/donation"
            className="rounded-full bg-gold px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-gold-dark"
          >
            בחרו את חלקכם בבניין
          </Link>
          <Link
            href="/built"
            className="rounded-full border border-gold px-8 py-3 text-base font-semibold text-gold-dark hover:bg-gold-light/20"
          >
            לראות את בית הכנסת הבנוי
          </Link>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="grid gap-6 md:grid-cols-3"
      >
        {["חוויה אינטראקטיבית", "הקדשה אישית על כל פריט", "מעקב בזמן אמת"].map(item => (
          <div key={item} className="card p-6 text-center">
            <h3 className="font-heading text-xl text-gold-dark">{item}</h3>
            <p className="mt-2 text-sm text-neutral-600">
              תהליך תרומה פשוט, מרגש ומקושר ישירות להדמיה של בית הכנסת.
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
