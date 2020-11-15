import styles from "../styles/Home.module.css";
import prettyMS from "pretty-ms";
import Brand from "../components/Brand";

const DEFAULT_BIO = "I am a very mysterious person, so mysterious that I didn't set a bio.";
const DEFAULT_DESCRIPTION = "Even we don't know what this repo does.";
let _cached;

export default function Home({ users, repos }) {
  return (
    <div className={styles.container}>
      <Brand />
      <section id="projects" className={styles.section}>
        <div className={styles.sectionLabel}>
          <h3>Projects</h3>
        </div>
        <div className={styles.cardContainer}>
          {repos.map((repo) => {
            const agoMS = Date.now() - new Date(repo.updated_at).getTime();
            const agoPretty = prettyMS(agoMS, { compact: true });

            return (
              <div className={styles.card} key={repo.id}>
                <div className={styles.cardBody}>
                  <div className={styles.cardDetails}>
                    <a href={repo.url} target="_about">
                      <h3>{repo.name}</h3>
                    </a>
                    <p>{repo.description ?? DEFAULT_DESCRIPTION}</p>
                  </div>
                </div>
                <footer className={styles.cardFooter}>Updated {agoPretty} ago</footer>
              </div>
            );
          })}
        </div>
      </section>
      <section id="members" className={styles.section}>
        <div className={styles.sectionLabel}>
          <h3>Members</h3>
        </div>
        <div className={styles.cardContainer}>
          {users.map((user) => (
            <div className={styles.card} key={user.id}>
              <div className={styles.cardBody}>
                <img className={styles.cardImage} src={user.avatar} />
                <div className={styles.cardDetails}>
                  <a href={user.url} target="_about">
                    <h3>{user.username}</h3>
                  </a>
                  <p>{user.bio ?? DEFAULT_BIO}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps() {
  if (_cached) return _cached;
  const headers = { Authorization: `token ${process.env.GITHUB_TOKEN} ` };
  const members = await fetch("https://api.github.com/orgs/sylo-digital/members", { headers }).then((r) => r.json());
  const repos = await fetch("https://api.github.com/orgs/sylo-digital/repos", { headers })
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
    );

  const userPromises = [];
  for (const member of members) {
    const promise = fetch(member.url, { headers })
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
  _cached = { props: { users, repos } };
  return _cached;
}
