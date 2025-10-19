"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { donationItems, type DonationItem } from "@/data/items";
import { DonationModal } from "@/components/DonationModal";

type FilterOption = "all" | DonationItem["category"] | "available" | "purchased";

const statusLabel: Record<DonationItem["status"], string> = {
  available: "פנוי",
  reserved: "בתהליך",
  purchased: "נרכש"
};

const statusColors: Record<DonationItem["status"], string> = {
  available: "border-emerald-400 bg-emerald-50 text-emerald-700",
  reserved: "border-amber-400 bg-amber-50 text-amber-700",
  purchased: "border-neutral-400 bg-neutral-100 text-neutral-600"
};

export function DonationGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  const [selectedItem, setSelectedItem] = useState<DonationItem | null>(null);

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") {
      return donationItems;
    }
    if (activeFilter === "available" || activeFilter === "purchased") {
      return donationItems.filter(item => item.status === activeFilter);
    }
    return donationItems.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {[
          { value: "all" as FilterOption, label: "כל הפריטים" },
          { value: "available" as FilterOption, label: "פנויים" },
          { value: "purchased" as FilterOption, label: "נרכשו" },
          { value: "אבן" as FilterOption, label: "אבנים" },
          { value: "כיסא" as FilterOption, label: "כיסאות" },
          { value: "חלון" as FilterOption, label: "חלונות" },
          { value: "פרוכת" as FilterOption, label: "פרוכות" },
          { value: "אריח" as FilterOption, label: "אריחים" }
        ].map(filter => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
              activeFilter === filter.value
                ? "border-gold bg-gold text-white"
                : "border-gold-light bg-white text-gold-dark hover:bg-gold-light/30"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map(item => (
          <motion.button
            key={item.id}
            layout
            onClick={() => item.status === "available" && setSelectedItem(item)}
            whileHover={{ y: -4 }}
            className={`card flex flex-col gap-3 p-6 text-right transition ${
              item.status === "available" ? "cursor-pointer hover:border-gold" : "cursor-not-allowed opacity-80"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full border px-3 py-1 text-xs font-semibold text-neutral-500">{item.category}</span>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColors[item.status]}`}
              >
                {statusLabel[item.status]}
              </span>
            </div>
            <h3 className="font-heading text-xl text-gold-dark">{item.label}</h3>
            <p className="text-sm text-neutral-500">עלות התרומה: ₪{item.price.toLocaleString()}</p>
            {item.status !== "available" && item.donorName && (
              <div className="rounded-xl bg-stone-light/70 p-3 text-sm text-neutral-600">
                <p className="font-semibold text-gold-dark">{item.donorName}</p>
                {item.dedication && <p className="text-xs text-neutral-600">"{item.dedication}"</p>}
              </div>
            )}
            {item.status === "available" && (
              <p className="text-xs text-neutral-500">
                לחיצה תפתח טופס תרומה מאובטח עם אפשרות להקדשה אישית.
              </p>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <DonationModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onSubmit={data => {
              console.log("Donation submitted", data);
              setSelectedItem(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
