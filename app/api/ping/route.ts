import { pingSitesRandomized } from "@/lib/pinger";

export async function GET(request: Request) {
  const secret = request.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const results = await pingSitesRandomized();

  return Response.json({ ok: true, results });
}

