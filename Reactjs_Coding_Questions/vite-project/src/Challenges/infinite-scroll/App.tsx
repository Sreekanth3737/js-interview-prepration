import { useCallback, useRef, useState } from "react";
import useFetch from "./useSearch";
import styles from "./app.module.scss";

const InfiniteScroll = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { items, loading, hasMore, error } = useFetch(pageNumber);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  return (
    <div>
      <div>
        {items.map((item, index) => {
          return (
            <div
              className={`${styles["book-title"]}`}
              key={index}
              ref={items.length === index + 1 ? lastElementRef : null}
            >
              {item?.body}
              {item.id}
            </div>
          );
        })}
      </div>
      {loading && <div className={styles.loader}></div>}
      {error && <div>Error...</div>}
      {!hasMore && (
        <div style={{ textAlign: "center", margin: "30px", padding: "40px" }}>
          no more content
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
