import { getSites, saveSites } from "@/lib/gitStorage";

export async function POST(req: Request) {
  const { link } = await req.json();
  const gist = await fetch(
    `https://api.github.com/gists/${process.env.GIST_ID}`
  );
  if (!gist.ok) return new Response("Failed to fetch gist", { status: 500 });
  const gistMetaData = await gist.json();

  const fileName = process.env.GIST_FILE!;

  const gistContent = gistMetaData.files[fileName].content;

  let { sites } = JSON.parse(gistContent);
  console.log(sites);
  sites = sites.filter((s: string) => s !== link);

  await saveSites(sites);

  return Response.json({ ok: true, sites });
}
