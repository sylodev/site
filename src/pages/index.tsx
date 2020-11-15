import prettyMS from "pretty-ms";
import Brand from "../components/Brand";
import { useMembers } from "../hooks/useMembers";
import { useRepos } from "../hooks/useRepos";
import styles from "../styles/Home.module.css";

const DEFAULT_BIO = "I am a very mysterious person, so mysterious that I didn't set a bio.";
const DEFAULT_DESCRIPTION = "Even we don't know what this repo does.";
let _cached;

export default function Home() {
  const repoData = useRepos();
  const memberData = useMembers();

  return (
    <div className={styles.container}>
      <Brand />
      <section id="projects" className={styles.section}>
        <div className={styles.sectionLabel}>
          <h3>Projects {repoData.loading && " (loading)"}</h3>
        </div>
        <div className={styles.cardContainer}>
          {repoData.repos.map((repo) => {
            const agoMS = Date.now() - new Date(repo.updated_at).getTime();
            const agoPretty = prettyMS(agoMS, { compact: true });

            return (
              <div className={styles.card} key={repo.id}>
                <a href={repo.url} target="_about">
                  <div className={styles.cardBody}>
                    <div className={styles.cardDetails}>
                      <h3>{repo.name}</h3>
                      <p>{repo.description ?? DEFAULT_DESCRIPTION}</p>
                    </div>
                  </div>
                  <footer className={styles.cardFooter}>Updated {agoPretty} ago</footer>
                </a>
              </div>
            );
          })}
        </div>
      </section>
      <section id="members" className={styles.section}>
        <div className={styles.sectionLabel}>
          <h3>Members {memberData.loading && " (loading)"}</h3>
        </div>
        <div className={styles.cardContainer}>
          {memberData.members.map((user) => (
            <div className={styles.card} key={user.id}>
              <a href={user.url} target="_about">
                <div className={styles.cardBody}>
                  <img className={styles.cardImage} src={user.avatar} />
                  <div className={styles.cardDetails}>
                    <h3>{user.username}</h3>
                    <p>{user.bio ?? DEFAULT_BIO}</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
