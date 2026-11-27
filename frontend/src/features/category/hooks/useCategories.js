import { useCallback, useEffect, useState } from "react";
import { getCategories } from "../api/categoryApi";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => {
    setReloadKey((current) => current + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setError("");

    getCategories({ signal: controller.signal })
      .then(setCategories)
      .catch((requestError) => {
        if (!controller.signal.aborted) {
          setError(requestError.message || "Could not load categories.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [reloadKey]);

  return { categories, isLoading, error, reload };
}
