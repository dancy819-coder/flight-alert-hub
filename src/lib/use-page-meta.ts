import { useEffect } from "react";

/**
 * Sets the document title and meta description for the current page.
 * Replaces TanStack Start's per-route `head()` config now that routing
 * is client-side only (no SSR to render <head> on the server).
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    let meta: HTMLMetaElement | null = null;
    let previousContent: string | null = null;
    if (description) {
      meta = document.querySelector('meta[name="description"]');
      if (meta) {
        previousContent = meta.getAttribute("content");
        meta.setAttribute("content", description);
      }
    }

    return () => {
      document.title = previousTitle;
      if (meta && previousContent !== null) {
        meta.setAttribute("content", previousContent);
      }
    };
  }, [title, description]);
}
