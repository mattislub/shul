export function Footer() {
  return (
    <footer className="border-t border-gold-light/60 bg-white/70 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-center text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} בונים יחד את בית ה׳. כל הזכויות שמורות.</p>
        <div className="flex justify-center gap-6">
          <a href="#vision" className="hover:text-gold-dark">
            על הפרויקט
          </a>
          <a href="#contact" className="hover:text-gold-dark">
            יצירת קשר
          </a>
          <a href="mailto:info@binyan-shul.org" className="hover:text-gold-dark">
            info@binyan-shul.org
          </a>
        </div>
      </div>
    </footer>
  );
}
