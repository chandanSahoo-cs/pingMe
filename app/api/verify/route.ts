export async function POST(req: Request) {
  const { password } = await req.json();

  if (password !== process.env.CRON_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  return new Response(JSON.stringify({ ok: true }));
}
