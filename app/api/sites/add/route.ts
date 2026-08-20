import { getSites, saveSites } from "@/lib/gitStorage";

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function POST(req: Request) {
  const sites = await getSites();
  const { link } = await req.json();

  if (!link || !link.startsWith("http"))
    return Response.json({ error: "Invalid URL" }, { status: 400 });

  if (!sites.includes(link)) {
    sites.push(link);
    await saveSites(sites);
  }

  return Response.json({ ok: true, sites });
}
