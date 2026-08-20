import { getSites } from "@/lib/gitStorage";

export const dynamic = "force-dynamic"
export const revalidate = 0

// pages/api/sites.ts
export async function GET() {

  const gist = await getSites();

  return new Response(JSON.stringify(gist), {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json",
    },
  });
}
