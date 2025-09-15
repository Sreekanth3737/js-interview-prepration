import React, { useState } from "react";
import { useInterval } from "./hooks/useInterval";
import { RefreshCw } from "lucide-react";
import styles from "./App.module.scss";

const LongPoolingComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_page=1&_limit=20"
      );
      const dataRes = await response.json();
      if (!response.ok) throw new Error("network Error");
      const shuffleData = [...dataRes].sort(() => Math.random() - 0.5);
      setData(shuffleData);
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useInterval(fetchData, 5000);

  if (error) return <div>{error}</div>;

  return (
    <>
      <div className={styles.postsBox}>
        <div className={styles.postsHeader}>
          <h2 className={styles.postsTitle}>Recent Posts</h2>
        </div>
        {loading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingBox}>
              <RefreshCw className={`${styles.loadingIcon} ${styles.spin}`} />
              <p>Updating data...</p>
            </div>
          </div>
        )}
        <div className={styles.postsGrid}>
          {data.map((item) => (
            <div key={item.id} className={styles.postCard}>
              <div className={styles.postMeta}>
                <span className={styles.postBadgeBlue}>ID: {item.id}</span>
                <span className={styles.postBadgeGreen}>
                  User {item.userId}
                </span>
              </div>
              <h3 className={styles.postTitle}>{item.title}</h3>
              <p className={styles.postBody}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LongPoolingComponent;
