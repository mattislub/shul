import { json } from '@/lib/utils';
import { generateAutoPlan } from '@/lib/llm';
import { validatePlan } from '@/lib/schema';

export async function POST(req: Request) {
  const { seed } = await req.json().catch(() => ({ seed: '' }));
  const plan = await generateAutoPlan(seed);
  if (!validatePlan(plan)) {
    return json({ error: 'Invalid plan', details: validatePlan.errors }, 400);
  }
  return json({ plan, confidence: 0.72 });
}
