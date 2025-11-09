export function json(data: unknown, init: number | ResponseInit = 200) {
  const status = typeof init === 'number' ? init : (init as ResponseInit).status ?? 200;
  const headers = new Headers(typeof init === 'number' ? {} : (init as ResponseInit).headers);
  headers.set('Content-Type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(data), { status, headers });
}
