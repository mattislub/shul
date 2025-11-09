import { json } from '@/lib/utils';
import { findGaps } from '@/lib/llm';

export async function POST(req: Request) {
  const { plan } = await req.json();
  const result = await findGaps(plan);
  return json(result);
}
