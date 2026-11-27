import { useCallback, useEffect, useState } from "react";
import { getCategoryBySlug } from "../api/categoryApi";

export default function useCategoryBySlug(slug) {
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(slug));
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const reload = useCallback(() => {
    setReloadKey((current) => current + 1);
  }, []);

  useEffect(() => {
    if (!slug) {
      setCategory(null);
      setError("");
      setIsLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    setCategory(null);
    setError("");
    setIsLoading(true);

    getCategoryBySlug(slug, { signal: controller.signal })
      .then(setCategory)
      .catch((requestError) => {
        if (!controller.signal.aborted) {
          setError(requestError.message || "Could not load this category.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [reloadKey, slug]);

  return { category, isLoading, error, reload };
}
