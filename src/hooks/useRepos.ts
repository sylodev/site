import { useEffect, useState } from "react";
import { LocalStorageCache } from "../classes/LocalStorageCache";

export interface Repository {
  id: number;
  name: string;
  description?: string;
  forks: number;
  url: string;
  updated_at: string;
}

const REPO_CACHE = new LocalStorageCache<Repository[]>("repositories");

export function useRepos() {
  const [repos, setRepos] = useState<Repository[]>(() => REPO_CACHE.get(process.env.NEXT_PUBLIC_GITHUB_ORG) ?? []);
  const [error, setError] = useState(false);
  const loading = !repos && !error;

  useEffect(() => {
    fetch(`https://api.github.com/orgs/${process.env.NEXT_PUBLIC_GITHUB_ORG}/repos`)
      .then((r) => r.json())
      .then((repos) =>
        repos.map((repo) => ({
          id: repo.id,
          name: repo.full_name,
          description: repo.description,
          forks: repo.forks_count,
          url: repo.html_url,
          updated_at: repo.updated_at,
        }))
      )
      .then((data: Repository[]) => {
        REPO_CACHE.set(process.env.NEXT_PUBLIC_GITHUB_ORG, data);
        setRepos(data);
      })
      .catch((e) => setError(e));
  }, []);

  return { repos, loading, error };
}
