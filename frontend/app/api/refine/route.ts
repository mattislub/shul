import { json } from '@/lib/utils';
import { refinePlan } from '@/lib/llm';

export async function POST(req: Request) {
  const { plan, intent } = await req.json();
  const refined = await refinePlan(plan, intent);
  return json({ plan: refined });
}
