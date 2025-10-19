import { motion } from "framer-motion";

const highlights = [
  {
    title: "הדמיה חיה של הבנייה",
    description: "צפו במודל תלת ממדי פשוט של בית הכנסת, והרגישו חלק מהתהליך בכל צעד."
  },
  {
    title: "הקדשה על כל פריט",
    description: "בחרו את האבן, הכיסא או החלון שלכם והוסיפו הקדשה שתופיע על הפריט עצמו."
  },
  {
    title: "שיתוף הקהילה",
    description: "שתפו ברשתות החברתיות את חלקכם בבניית בית הכנסת וצרו השראה לאחרים."
  }
];

export function ExperienceHighlights() {
  return (
    <section id="vision" className="mx-auto max-w-6xl space-y-8">
      <div>
        <h2 className="section-title">חוויה שמרגישה כמו להיות שם</h2>
        <p className="section-subtitle">
          שילוב של וידאו, הדמיות ואנימציות יוצר מסע תרומה שמחבר את התורם לבניין האמיתי.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {highlights.map(({ title, description }, index) => (
          <motion.article
            key={title}
            className="card space-y-4 p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex h-40 items-center justify-center rounded-xl bg-stone-light/70 text-5xl">🎬</div>
            <div>
              <h3 className="font-heading text-xl text-gold-dark">{title}</h3>
              <p className="text-sm text-neutral-600">{description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
