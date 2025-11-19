import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";

// pages/api/sites.ts
export async function GET() {
  //   const gistRes = await fetch(process.env.GIST_URL!, { cache: "no-store" });

  const gist = await fetch(
    `https://api.github.com/gists/${process.env.GIST_ID}`
  );
  if (!gist.ok) return new Response("Failed to fetch gist", { status: 500 });
  const gistMetaData = await gist.json();

  const fileName = process.env.GIST_FILE!;

  const gistContent = gistMetaData.files[fileName].content;

  //   const data = await gistRes.json();

  return new Response(JSON.stringify(JSON.parse(gistContent)), {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json",
    },
  });
}
