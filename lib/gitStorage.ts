import "server-only"

export async function getSites(req?: Request) {
  const gist = await fetch(
    `https://api.github.com/gists/${process.env.GIST_ID}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );
  if (!gist.ok) return new Error("Failed to fetch gist");
  const gistMetaData = await gist.json();

  const fileName = process.env.GIST_FILE!;

  const gistContent = gistMetaData.files[fileName].content;
  console.log(gistContent);
  const data = JSON.parse(gistContent);
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
    },
  );

  if (!res.ok) throw new Error("Failed to update Gist");
}
