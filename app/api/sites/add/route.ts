import { getSites, saveSites } from "@/lib/gitStorage";

export async function POST(req: Request) {
  //   const gistRes = await fetch(process.env.GIST_URL!, { cache: "no-store" });
  //   if (!gistRes.ok) return new Response("Failed to fetch gist", { status: 500 });

  const gist = await fetch(
    `https://api.github.com/gists/${process.env.GIST_ID}`
  );
  if (!gist.ok) return new Response("Failed to fetch gist", { status: 500 });
  const gistMetaData = await gist.json();

  const fileName = process.env.GIST_FILE!;

  const gistContent = gistMetaData.files[fileName].content;

  const { sites } = JSON.parse(gistContent);

  const { link } = await req.json();

  if (!link || !link.startsWith("http"))
    return Response.json({ error: "Invalid URL" }, { status: 400 });

  if (!sites.includes(link)) {
    sites.push(link);
    await saveSites(sites);
  }

  return Response.json({ ok: true, sites });
}
