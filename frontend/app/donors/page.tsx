"use client";

import { useMemo, useState } from "react";
import { donors } from "@/data/donors";
import { motion } from "framer-motion";

export const metadata = {
  title: "רשימת התורמים וההקדשות - בונים יחד את בית ה׳"
};

const sortOptions = [
  { value: "recent", label: "לפי סדר תרומה" },
  { value: "amount", label: "גובה התרומה" },
  { value: "name", label: "שם התורם" }
] as const;

type SortOption = (typeof sortOptions)[number]["value"];

export default function DonorsPage() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [showPublicOnly, setShowPublicOnly] = useState(true);

  const filteredDonors = useMemo(() => {
    return donors
      .filter(record => (showPublicOnly ? record.public : true))
      .filter(record =>
        query
          ? record.donorName.includes(query) || record.dedication?.includes(query) || record.item.includes(query)
          : true
      )
      .sort((a, b) => {
        if (sortBy === "recent") {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        if (sortBy === "amount") {
          return b.amount - a.amount;
        }
        return a.donorName.localeCompare(b.donorName);
      });
  }, [query, sortBy, showPublicOnly]);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header className="space-y-4">
        <h1 className="font-heading text-4xl text-gold-dark">רשימת התורמים</h1>
        <p className="max-w-3xl text-neutral-600">
          גלריה מעוררת השראה של תורמים שהצטרפו לחזון. ניתן לחפש לפי שם או הקדשה, למיין לפי גובה תרומה או להציג גם הקדשות פרטיות.
        </p>
        <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-gold-light bg-white/80 p-4 shadow-sm">
          <input
            type="text"
            placeholder="חיפוש לפי שם או הקדשה"
            value={query}
            onChange={event => setQuery(event.target.value)}
            className="flex-1 min-w-[200px] rounded-2xl border border-gold-light bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none"
          />
          <select
            value={sortBy}
            onChange={event => setSortBy(event.target.value as SortOption)}
            className="rounded-2xl border border-gold-light bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm text-neutral-600">
            <input
              type="checkbox"
              checked={showPublicOnly}
              onChange={event => setShowPublicOnly(event.target.checked)}
            />
            להציג רק הקדשות ציבוריות
          </label>
        </div>
      </header>
      <motion.section layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDonors.map(record => (
          <motion.article key={record.id} layout className="card space-y-3 p-6">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>{new Date(record.date).toLocaleDateString("he-IL")}</span>
              <span>₪{record.amount.toLocaleString()}</span>
            </div>
            <h3 className="font-heading text-xl text-gold-dark">{record.donorName}</h3>
            <p className="text-sm text-neutral-500">תרם עבור: {record.item}</p>
            {record.public ? (
              <blockquote className="rounded-xl bg-gold-light/20 p-4 text-sm text-neutral-700">
                {record.dedication ? `"${record.dedication}"` : "ללא הקדשה"}
              </blockquote>
            ) : (
              <div className="rounded-xl bg-stone-light/70 p-4 text-sm text-neutral-500">
                הקדשה פרטית (תוצג רק לצוות הניהול)
              </div>
            )}
          </motion.article>
        ))}
        {filteredDonors.length === 0 && (
          <div className="col-span-full rounded-3xl border border-dashed border-gold-light bg-white/70 p-10 text-center text-neutral-500">
            לא נמצאו תורמים התואמים לחיפוש.
          </div>
        )}
      </motion.section>
    </div>
  );
}
