import { useState, useCallback } from "react";

const LIKES_KEY = "gallery_likes";
const FAVORITES_KEY = "gallery_favorites";

function loadSet(key: string): Set<number> {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as number[]);
  } catch {
    return new Set();
  }
}

function saveSet(key: string, set: Set<number>) {
  localStorage.setItem(key, JSON.stringify(Array.from(set)));
}

export function useGalleryState() {
  const [likes, setLikes] = useState<Set<number>>(() => loadSet(LIKES_KEY));
  const [favorites, setFavorites] = useState<Set<number>>(() => loadSet(FAVORITES_KEY));

  const toggleLike = useCallback((id: number) => {
    setLikes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveSet(LIKES_KEY, next);
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveSet(FAVORITES_KEY, next);
      return next;
    });
  }, []);

  return { likes, favorites, toggleLike, toggleFavorite };
}
