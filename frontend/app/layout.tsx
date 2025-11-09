import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'AI Website Planner',
  description: 'בניית תוכנית אתר אוטומטית עם שאלות המשך חכמות'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he">
      <body>{children}</body>
    </html>
  );
}
