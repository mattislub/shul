import { motion } from "framer-motion";

const steps = [
  {
    title: "בחירת הפריט",
    description: "תצוגה אינטראקטיבית של בית הכנסת עם פריטים פנויים ומסומנים בצבע ירוק.",
    icon: "🧱"
  },
  {
    title: "כתיבת הקדשה",
    description: "חלונית התרומה מאפשרת להוסיף הקדשה אישית ולבחור האם להציג אותה בציבור.",
    icon: "🕯️"
  },
  {
    title: "תשלום מאובטח",
    description: "שילוב עם ספק תשלומים מאושר PCI ושמירה על נתוני התורם.",
    icon: "🔒"
  },
  {
    title: "הופעה בהדמיה",
    description: "לאחר האישור, הפריט נצבע באפור ומציג את שם התורם וההקדשה בהדמיה ובגלריה.",
    icon: "🏛️"
  }
];

export function JourneySteps() {
  return (
    <section className="mx-auto max-w-6xl space-y-8">
      <div>
        <h2 className="section-title">מסע התרומה המלא</h2>
        <p className="section-subtitle">משלב התכנון ועד חוויית התורם, הכל מחובר למערכת אחת.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            className="card space-y-4 p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-light/60 text-3xl text-gold-dark">
              {step.icon}
            </div>
            <div>
              <h3 className="font-heading text-xl text-gold-dark">{step.title}</h3>
              <p className="text-sm text-neutral-600">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
