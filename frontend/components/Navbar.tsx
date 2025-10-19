"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "בית" },
  { href: "/donation", label: "בחרו את חלקכם" },
  { href: "/built", label: "בית הכנסת הבנוי" },
  { href: "/donors", label: "רשימת התורמים" }
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold-light/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-white shadow-lg">
            <span className="text-xl font-semibold">ה׳</span>
          </div>
          <div>
            <p className="font-heading text-lg text-gold-dark">בונים יחד את בית ה׳</p>
            <p className="text-sm text-neutral-500">חוויית תרומה מרגשת וחדשנית</p>
          </div>
        </div>
        <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-600 md:flex">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute -inset-x-2 -top-2 h-10 rounded-full bg-gold-light/70"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 px-1">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
