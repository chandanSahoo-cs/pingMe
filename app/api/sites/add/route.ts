import { getSites, saveSites } from "@/lib/gitStorage";

export async function POST(req: Request) {
  const { link } = await req.json();

  if (!link || !link.startsWith("http"))
    return Response.json({ error: "Invalid URL" }, { status: 400 });

  const sites = await getSites();

  if (!sites.includes(link)) {
    sites.push(link);
    await saveSites(sites);
  }

  return Response.json({ ok: true, sites });
}
