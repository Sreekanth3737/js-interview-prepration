import { useEffect, useState } from "react";

type Photo = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function useFetch(pageNumber: number) {
  const [items, setItems] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=10`,
          {
            signal: controller.signal,
          }
        );
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        const data = await response.json();
        setItems((prev) => [...prev, ...data]);
        setHasMore(data.length > 0);
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
          console.log("Fetch cancelled");
        } else {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
    return () => {
      controller.abort();
    };
  }, [pageNumber]);

  return { items, hasMore, loading, error };
}
