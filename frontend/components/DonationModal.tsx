"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DonationItem } from "@/data/items";

interface DonationModalProps {
  item: DonationItem;
  onClose: () => void;
  onSubmit: (data: { donorName: string; dedication: string; sharePublicly: boolean; amount: number }) => void;
}

export function DonationModal({ item, onClose, onSubmit }: DonationModalProps) {
  const [donorName, setDonorName] = useState("");
  const [dedication, setDedication] = useState("");
  const [sharePublicly, setSharePublicly] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="w-full max-w-lg rounded-3xl border border-gold-light bg-white p-8 shadow-2xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-heading text-2xl text-gold-dark">{item.label}</h3>
            <p className="text-sm text-neutral-500">עלות התרומה: ₪{item.price.toLocaleString()}</p>
          </div>
          <button onClick={onClose} className="text-2xl text-neutral-400 transition hover:text-neutral-700">
            ×
          </button>
        </div>
        <form
          className="mt-6 space-y-5"
          onSubmit={event => {
            event.preventDefault();
            onSubmit({ donorName, dedication, sharePublicly, amount: item.price });
          }}
        >
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-600" htmlFor="donorName">
              שם התורם/ת
            </label>
            <input
              id="donorName"
              required
              value={donorName}
              onChange={event => setDonorName(event.target.value)}
              className="w-full rounded-xl border border-gold-light bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none"
              placeholder="לדוגמה: משפחת כהן"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-600" htmlFor="dedication">
              הקדשה אישית (אופציונלי)
            </label>
            <textarea
              id="dedication"
              rows={4}
              value={dedication}
              onChange={event => setDedication(event.target.value)}
              className="w-full rounded-xl border border-gold-light bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none"
              placeholder="נוסח ההקדשה שיוצג על הפריט"
            />
          </div>
          <div className="flex items-center justify-between rounded-xl bg-stone-light/60 px-4 py-3 text-sm text-neutral-600">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={sharePublicly}
                onChange={event => setSharePublicly(event.target.checked)}
              />
              להציג את ההקדשה לציבור
            </label>
            <span>סכום לתרומה: ₪{item.price.toLocaleString()}</span>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-gold px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-gold-dark"
          >
            מעבר לתשלום מאובטח
          </button>
        </form>
      </motion.div>
    </div>
  );
}
