import { getSites, saveSites } from "@/lib/gitStorage";

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function POST(req: Request) {
  const { link } = await req.json();
  let sites = await getSites();
  sites = sites.filter((s: string) => s !== link);

  await saveSites(sites);

  return Response.json({ ok: true, sites });
}
