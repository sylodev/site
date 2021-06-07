import prettyMS from "pretty-ms";
import Brand from "../components/brand/brand";
import useSWR from "swr";
import { Repository, RepositoryPartial } from "../types";
import { Center } from "../components/center";
import { Card } from "../components/card";
import { GetStaticProps } from "next";

const DEFAULT_DESCRIPTION = "Even we don't know what this repo does.";
const REPO_URL = "https://api.github.com/orgs/sylo-digital/repos";

export interface HomeProps {
  initialData?: RepositoryPartial[];
}

export default function Home({ initialData }: HomeProps) {
  const { data, error } = useSWR<RepositoryPartial[]>(REPO_URL, { initialData });
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
            const prettyTimeAgo = prettyMS(relativeTimeAgo, { verbose: true, compact: true });
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

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const response = await fetch(REPO_URL);
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  const body = (await response.json()) as Repository[];
  return {
    props: {
      initialData: body.map<RepositoryPartial>((item) => ({
        id: item.id,
        full_name: item.full_name,
        html_url: item.html_url,
        description: item.description,
        updated_at: item.updated_at,
      })),
    },
  };
};
