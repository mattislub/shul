import Link from "next/link";

export function DonationCTA() {
  return (
    <section className="mx-auto max-w-5xl rounded-3xl border border-gold-light bg-white/80 p-10 text-center shadow-xl">
      <h2 className="font-heading text-3xl text-gold-dark">אנחנו בונים יחד – הצטרפו אלינו היום</h2>
      <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-600">
        כל תרומה מקרבת אותנו עוד צעד להשלמת בית הכנסת. בחרו את הפריט שמדבר אליכם, הוסיפו הקדשה, והיו חלק מדבר גדול.
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <Link
          href="/donation"
          className="rounded-full bg-gold px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-gold-dark"
        >
          להתחיל את התרומה
        </Link>
        <Link href="/donors" className="rounded-full border border-gold px-8 py-3 text-base font-semibold text-gold-dark">
          לראות את רשימת התורמים
        </Link>
      </div>
    </section>
  );
}
