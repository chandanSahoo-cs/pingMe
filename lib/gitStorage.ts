export async function getSites(req?: Request) {
  let url = "/api/sites/get";

  if (typeof window === "undefined") {
    const host = process.env.VERCEL_URL || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    url = `${protocol}://${host}/api/sites/get`;
  }
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch Gist");

  const data = await res.json();
  console.log(data);
  return data.sites || [];
}

export async function saveSites(sites: string[]) {
  const body = {
    files: {
      [process.env.GIST_FILE!]: {
        content: JSON.stringify({ sites }, null, 2),
      },
    },
  };

  const res = await fetch(
    `https://api.github.com/gists/${process.env.GIST_ID}`,

    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) throw new Error("Failed to update Gist");
}
