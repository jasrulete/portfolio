// use-github-stats.ts
//
// Fetches live stats (stars, last-updated, primary language) for every
// project in profile.ts that has a `github` URL, and caches results in
// sessionStorage for an hour so repeat visits/renders don't re-hit the API.
// No auth needed for public repos; unauthenticated rate limit is 60
// req/hour per visitor IP, which is comfortable for a handful of projects.

import { useEffect, useState } from "react";

export interface GithubStats {
  stars: number;
  forks: number;
  language: string | null;
  pushedAt: string; // ISO date string
}

type StatsMap = Record<string, GithubStats>; // keyed by github URL

const CACHE_KEY = "gh-project-stats-cache";
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour

function parseOwnerRepo(githubUrl: string): { owner: string; repo: string } | null {
  try {
    const { pathname } = new URL(githubUrl);
    const [owner, repo] = pathname.replace(/^\//, "").replace(/\/$/, "").split("/");
    if (!owner || !repo) return null;
    return { owner, repo };
  } catch {
    return null;
  }
}

export function useGithubStats(githubUrls: string[]): {
  stats: StatsMap;
  loading: boolean;
} {
  const [stats, setStats] = useState<StatsMap>({});
  const [loading, setLoading] = useState(true);

  // Stable key so the effect doesn't re-run every render on a new array identity
  const urlsKey = githubUrls.slice().sort().join(",");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, ts } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL_MS) {
          setStats(data);
          setLoading(false);
          return;
        }
      }

      const entries = await Promise.all(
        githubUrls.map(async (url) => {
          const parsed = parseOwnerRepo(url);
          if (!parsed) return null;
          try {
            const res = await fetch(
              `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`,
              { headers: { Accept: "application/vnd.github+json" } }
            );
            if (!res.ok) return null;
            const data = await res.json();
            const result: GithubStats = {
              stars: data.stargazers_count ?? 0,
              forks: data.forks_count ?? 0,
              language: data.language ?? null,
              pushedAt: data.pushed_at ?? data.updated_at,
            };
            return [url, result] as const;
          } catch {
            return null;
          }
        })
      );

      if (cancelled) return;

      const map: StatsMap = {};
      for (const entry of entries) {
        if (entry) map[entry[0]] = entry[1];
      }
      setStats(map);
      setLoading(false);
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: map, ts: Date.now() }));
    }

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlsKey]);

  return { stats, loading };
}