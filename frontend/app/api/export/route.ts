export async function POST(req: Request) {
  const { plan } = await req.json();
  return new Response(JSON.stringify(plan, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': 'attachment; filename="plan.json"'
    }
  });
}
