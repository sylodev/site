import { useEffect, useState } from "react";
import { LocalStorageCache } from "../classes/LocalStorageCache";

export interface Member {
  id: number;
  url: string;
  username: string;
  avatar: string;
  bio?: string;
}

const MEMBER_CACHE = new LocalStorageCache<Member[]>("members");

export function useMembers() {
  const [members, setMembers] = useState<Member[]>(() => MEMBER_CACHE.get(process.env.NEXT_PUBLIC_GITHUB_ORG) ?? []);
  const [error, setError] = useState(false);
  const loading = !members && !error;

  useEffect(() => {
    const fetchMembers = async () => {
      const members = await fetch("https://api.github.com/orgs/sylo-digital/members").then((r) => r.json());
      const userPromises = [];
      for (const member of members) {
        const promise = fetch(member.url)
          .then((r) => r.json())
          .then((user) => ({
            id: user.id,
            url: user.html_url,
            username: user.name ?? user.login,
            avatar: user.avatar_url,
            bio: user.bio,
          }));

        userPromises.push(promise);
      }

      const users = await Promise.all(userPromises);
      MEMBER_CACHE.set(process.env.NEXT_PUBLIC_GITHUB_ORG, users);
      return users;
    };

    fetchMembers()
      .then((data) => setMembers(data))
      .catch((e) => setError(e));
  }, []);

  return { members, loading, error };
}
