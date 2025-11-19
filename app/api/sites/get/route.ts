import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";

// pages/api/sites.ts
export async function GET() {
  const gistRes = await fetch(process.env.GIST_URL!, { cache: "no-store" });
  if (!gistRes.ok) return new Response("Failed to fetch gist", { status: 500 });

  const data = await gistRes.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json",
    },
  });
}
