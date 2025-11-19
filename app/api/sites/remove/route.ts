import { getSites, saveSites } from "@/lib/gitStorage";

export async function POST(req: Request) {
  const { link } = await req.json();
  console.log("hello");
  let sites = await getSites();
  console.log(sites);
  sites = sites.filter((s: string) => s !== link);

  await saveSites(sites);

  return Response.json({ ok: true, sites });
}
