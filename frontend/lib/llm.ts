// בשלב ראשון: מחולל תוצאה דטרמיניסטית כדי להדגים את הזרימה ללא מפתח/עלויות.

export type Plan = any; // אפשר לחדד עם טיפוס לפי הסכימה

export async function generateAutoPlan(seed: string = ''): Promise<Plan> {
  const topic = seed?.trim() || 'עסק קטן';
  return {
    brand: {
      name: topic,
      tone: ['מקצועי', 'ידידותי'],
      palette: ['#0F172A', '#4C5BD5', '#F5F7FF'],
      logo: { status: 'needed' }
    },
    goals: ['לידים'],
    audience: 'לקוחות מקומיים המחפשים שירות אמין ומהיר',
    siteMap: [
      { slug: '/', title: 'דף הבית' },
      { slug: '/about', title: 'אודות' },
      { slug: '/services', title: 'שירותים' },
      { slug: '/portfolio', title: 'תיק עבודות' },
      { slug: '/contact', title: 'צור קשר' }
    ],
    pages: [
      {
        slug: '/',
        title: 'דף הבית',
        wireframe: [
          {
            type: 'Hero',
            props: {
              headline: `${topic}: פתרונות מעוצבים ומדויקים`,
              sub: 'איכות, שקיפות ושירות אישי',
              cta: 'דברו איתנו'
            }
          },
          { type: 'Benefits', props: { items: 3 } },
          { type: 'ServicesPreview' },
          { type: 'SocialProof' },
          { type: 'CTA' }
        ],
        copy: {
          h1: `${topic} – ברוכים הבאים`,
          sections: [{ title: 'למה אנחנו', text: 'דיוק, זמינות וחשיבה עסקית.' }]
        },
        seo: {
          title: `${topic} – עיצוב ושירות`,
          description: `${topic} עם חוויית שירות מצוינת ותוצאות מדידות.`
        }
      },
      { slug: '/about', title: 'אודות', wireframe: [{ type: 'Story' }, { type: 'Team' }, { type: 'CTA' }], copy: {}, seo: {} },
      {
        slug: '/services',
        title: 'שירותים',
        wireframe: [{ type: 'Cards', props: { count: 6 } }, { type: 'FAQ' }, { type: 'CTA' }],
        copy: {},
        seo: {}
      },
      {
        slug: '/portfolio',
        title: 'תיק עבודות',
        wireframe: [{ type: 'Grid', props: { cols: 3 } }, { type: 'Testimonials' }, { type: 'CTA' }],
        copy: {},
        seo: {}
      },
      { slug: '/contact', title: 'צור קשר', wireframe: [{ type: 'Form' }, { type: 'Map' }], copy: {}, seo: {} }
    ],
    contact: { primary: ['וואטסאפ', 'טלפון', 'טופס קצר'] }
  };
}

export async function findGaps(plan: Plan): Promise<{ questions: string[] }> {
  const questions: string[] = [];
  if (!plan?.brand?.logo || plan.brand.logo.status === 'needed') {
    questions.push('יש לוגו מוכן לשימוש? (כן/לא)');
  }
  if (!plan?.brand?.palette || plan.brand.palette.length < 2) {
    questions.push('נבחר צבע ראשי ומשני או להציע אוטומטית?');
  }
  if (!plan?.pages?.[0]?.copy?.h1) {
    questions.push('מה הכותרת הראשית (H1) לדף הבית?');
  }
  return { questions: questions.slice(0, 5) };
}

export async function refinePlan(plan: Plan, intent: 'yokrati' | 'friendly' | 'short'): Promise<Plan> {
  const clone = JSON.parse(JSON.stringify(plan));
  if (intent === 'short') {
    clone.pages?.forEach((p: any) => {
      if (p.copy?.sections) {
        p.copy.sections = p.copy.sections.map((s: any) => ({ ...s, text: (s.text || '').slice(0, 90) }));
      }
      if (p.seo?.description) p.seo.description = (p.seo.description || '').slice(0, 140);
    });
  }
  if (intent === 'friendly') {
    clone.brand.tone = Array.from(new Set([...(clone.brand.tone || []), 'ידידותי']));
  }
  if (intent === 'yokrati') {
    clone.brand.tone = Array.from(new Set([...(clone.brand.tone || []), 'יוקרתי']));
  }
  return clone;
}
