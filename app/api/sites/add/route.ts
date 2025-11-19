import { getSites, saveSites } from "@/lib/gitStorage";

export async function POST(req: Request) {
  const gistRes = await fetch(process.env.GIST_URL!, { cache: "no-store" });
  if (!gistRes.ok) return new Response("Failed to fetch gist", { status: 500 });

  const { sites } = await gistRes.json();

  const { link } = await req.json();

  if (!link || !link.startsWith("http"))
    return Response.json({ error: "Invalid URL" }, { status: 400 });

  if (!sites.includes(link)) {
    sites.push(link);
    await saveSites(sites);
  }

  return Response.json({ ok: true, sites });
}
