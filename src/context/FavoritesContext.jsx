import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext.jsx";

const FavoritesContext = createContext(null);

function storageKey(user) {
  return `dbz-search_favorites_${user ? user.username : "guest"}`;
}

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [ids, setIds] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(user));
      setIds(raw ? JSON.parse(raw) : []);
    } catch {
      setIds([]);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(storageKey(user), JSON.stringify(ids));
  }, [ids, user]);

  const value = useMemo(
    () => ({
      ids,
      isFavorite: (id) => ids.includes(String(id)),
      toggle: (id) =>
        setIds((current) =>
          current.includes(String(id))
            ? current.filter((x) => x !== String(id))
            : [...current, String(id)]
        ),
      remove: (id) => setIds((current) => current.filter((x) => x !== String(id))),
      clear: () => setIds([]),
    }),
    [ids]
  );

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside <FavoritesProvider>");
  return ctx;
}
