import prettyMS from "pretty-ms";
import Brand from "../components/brand/brand";
import useSWR from "swr";
import { Repository } from "../types";
import { Center } from "../components/center";
import { Card } from "../components/card";

const DEFAULT_DESCRIPTION = "Even we don't know what this repo does.";

export default function Home() {
  const { data, error } = useSWR<Repository[]>("https://api.github.com/orgs/sylo-digital/repos");
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <Center>
      <div className="container mx-auto">
        <Brand />
        <div className="text-gray">
          <h3>Projects {!data && " (loading)"}</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((repo) => {
            const lastUpdated = new Date(repo.updated_at).getTime();
            const relativeTimeAgo = Date.now() - lastUpdated;
            const prettyTimeAgo = prettyMS(relativeTimeAgo, { verbose: true, unitCount: 2 });
            const timestamp = `${prettyTimeAgo} ago`;

            return (
              <Card
                description={repo.description ?? DEFAULT_DESCRIPTION}
                footer={timestamp}
                link={repo.html_url}
                title={repo.full_name}
                key={repo.id}
              />
            );
          })}
        </div>
      </div>
    </Center>
  );
}
