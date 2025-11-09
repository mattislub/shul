'use client';
import { useState } from 'react';

type Plan = any;

export default function Home() {
  const [seed, setSeed] = useState('');
  const [plan, setPlan] = useState<Plan | null>(null);
  const [conf, setConf] = useState<number>(0);
  const [gaps, setGaps] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function buildAuto() {
    setLoading(true);
    try {
      const res = await fetch('/api/auto-plan', {
        method: 'POST',
        body: JSON.stringify({ seed }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setPlan(data.plan);
      setConf(data.confidence ?? 0.7);
      await fetchGaps(data.plan);
    } finally {
      setLoading(false);
    }
  }

  async function fetchGaps(p: Plan) {
    const res = await fetch('/api/gaps', {
      method: 'POST',
      body: JSON.stringify({ plan: p }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    setGaps(data.questions || []);
  }

  async function refine(intent: 'yokrati' | 'friendly' | 'short') {
    if (!plan) return;
    const res = await fetch('/api/refine', {
      method: 'POST',
      body: JSON.stringify({ plan, intent }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    setPlan(data.plan);
  }

  async function downloadJson() {
    if (!plan) return;
    const res = await fetch('/api/export', {
      method: 'POST',
      body: JSON.stringify({ plan }),
      headers: { 'Content-Type': 'application/json' }
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plan.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="container">
      <div className="card" style={{ marginBottom: 12 }}>
        <h1 style={{ marginTop: 0 }}>מחולל תוכנית אתר – אוטומטי</h1>
        <p>
          לחצו "בנה לבד" ללא קלט. אפשר לתת רמז קצר (לא חובה), לדוגמה: <span className="kbd">גרפיקאית</span>
        </p>
        <div className="row">
          <input
            className="input"
            placeholder="מילה אחת על העסק (לא חובה)"
            value={seed}
            onChange={e => setSeed(e.target.value)}
          />
          <button className="btn primary" onClick={buildAuto} disabled={loading}>
            {loading ? 'בונה…' : 'בנה לבד'}
          </button>
        </div>
      </div>

      {plan && (
        <div className="card" style={{ marginBottom: 12 }}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <div>
              <strong>תוכנית נוצרה</strong>{' '}
              {conf ? <span className="badge">confidence {Math.round(conf * 100)}%</span> : null}
            </div>
            <div className="row">
              <button className="btn" onClick={() => refine('friendly')}>
                יותר ידידותי
              </button>
              <button className="btn" onClick={() => refine('yokrati')}>
                יותר יוקרתי
              </button>
              <button className="btn" onClick={() => refine('short')}>
                קצר יותר
              </button>
              <button className="btn" onClick={downloadJson}>
                ייצוא JSON
              </button>
            </div>
          </div>

          <h3>חוסרים מומלצים (נשאל רק כשצריך)</h3>
          {gaps.length === 0 ? (
            <p>מוכן למסירה. אפשר לייצא.</p>
          ) : (
            <ol>
              {gaps.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ol>
          )}

          <h3>תצוגה מהירה</h3>
          <pre>{JSON.stringify(plan, null, 2)}</pre>
        </div>
      )}

      {!plan && (
        <div className="card">
          <p>
            עדיין לא נוצרה תוכנית. התחילו בלחיצה על <b>"בנה לבד"</b>.
          </p>
        </div>
      )}
    </div>
  );
}
