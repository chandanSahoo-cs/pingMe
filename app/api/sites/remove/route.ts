import { getSites, saveSites } from "@/lib/gitStorage";

export async function POST(req: Request) {
  const { link } = await req.json();
  console.log("hello");
  const gistRes = await fetch(process.env.GIST_URL!, { cache: "no-store" });
  if (!gistRes.ok) return new Response("Failed to fetch gist", { status: 500 });

  let { sites } = await gistRes.json();
  console.log(sites);
  sites = sites.filter((s: string) => s !== link);

  await saveSites(sites);

  return Response.json({ ok: true, sites });
}
