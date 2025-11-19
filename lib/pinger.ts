import { getSites } from "./gitStorage";

export async function pingSitesRandomized() {
  const SITES = await getSites();

  const PATHS = [
    "/",
    "/?t=" + Math.random(),
    "/?id=" + Math.floor(Math.random() * 10000000),
    "/?u=" + Date.now(),
    "/health",
  ];

  const UAs = [
    "Mozilla/5.0 (Windows NT 10.0; Win64)",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X)",
    "Mozilla/5.0 (X11; Linux x86_64)",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0)",
  ];

  const LANGS = ["en-US,en;q=0.9", "en-GB,en;q=0.8", "hi-IN,en;q=0.7"];

  const rand = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

  const results: any[] = [];

  for (const site of SITES) {
    const path = rand(PATHS);
    const ua = rand(UAs);
    const lang = rand(LANGS);
    const ref = `https://google.com/search?q=${Math.floor(
      Math.random() * 999999
    )}`;

    const jitter = Math.random() * 400 + 100;
    await new Promise((res) => setTimeout(res, jitter));

    try {
      const response = await fetch(site + path, {
        cache: "no-store",
        headers: {
          "User-Agent": ua,
          "Accept-Language": lang,
          Referer: ref,
          "X-Request-ID": String(Math.random()).slice(2),
        },
      });

      results.push({
        url: site + path,
        status: response.status,
        ua,
        lang,
        ref,
      });
    } catch (error) {
      results.push({
        url: site + path,
        status: "error",
        error: String(error),
      });
    }
  }

  return results;
}
