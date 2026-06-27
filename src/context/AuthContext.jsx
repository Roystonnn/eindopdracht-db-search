import { createContext, useContext, useState, useCallback } from "react";

const API_URL =
    import.meta.env.VITE_NOVI_API_URL ||
    "https://novi-backend-api-wgsgz.ondigitalocean.app/api";
const PROJECT_ID = import.meta.env.VITE_NOVI_PROJECT_ID;
if (!PROJECT_ID) {
  console.warn(
      "[AuthContext] VITE_NOVI_PROJECT_ID ontbreekt. Maak een .env-bestand op basis van .env.example."
  );
}
const TOKEN_KEY = "db-search_token";

const AuthContext = createContext(null);

function baseHeaders(token) {
  const h = {
    "Content-Type": "application/json",
    "novi-education-project-id": PROJECT_ID,
  };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

async function parseError(res, fallback) {
  let msg = fallback;
  try {
    const data = await res.json();
    msg = data?.message || data?.error || fallback;
  } catch {
    try {
      const text = await res.text();
      if (text) msg = text;
    } catch {/*ignore*/}
  }
  return new Error(msg);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) return null;
    const me = userFromToken(stored);
    const expired = me.exp && me.exp * 1000 < Date.now();
    if (expired) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
    return me;
  });
  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) return null;
    const me = userFromToken(stored);
    const expired = me.exp && me.exp * 1000 < Date.now();
    if (expired) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
    return stored;
  });
  const [status, setStatus] = useState("done");

  function decodeJwt(token) {
    try {
      const payload = token.split(".")[1];
      const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
      return JSON.parse(decodeURIComponent(escape(json)));
    } catch {
      return null;
    }
  }

  function userFromToken(token, fallback) {
    const claims = decodeJwt(token) || {};
    const email = claims.email || fallback?.email || "";
    return {
      id: claims.userId ?? claims.sub ?? claims.id ?? fallback?.id ?? null,
      email,
      username: email ? email.split("@")[0] : "warrior",
      roles: claims.roles || fallback?.roles || [],
      exp: claims.exp || null,
    };
  }

  const login = useCallback(async ({ email, password }) => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: baseHeaders(),
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw await parseError(res, "Inloggen mislukt. Controleer je gegevens.");
    const data = await res.json();
    const accessToken = data.token || data.accessToken || data.jwt;
    if (!accessToken) throw new Error("Geen access token ontvangen van de server.");
    localStorage.setItem(TOKEN_KEY, accessToken);
    setToken(accessToken);
    const me = userFromToken(accessToken, data.user);
    setUser(me);
    return me;
  }, [userFromToken]);

  const register = useCallback(async ({ email, password }) => {
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: baseHeaders(),
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw await parseError(res, "Account aanmaken mislukt.");
    return login({ email, password });
  }, [login]);

  const updateProfile = useCallback(async () => {
    throw new Error(
        "Profiel bewerken is niet beschikbaar in de NOVI backend API."
    );
  }, []);


  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    status,
    isAuthenticated: !!user,
    login,
    register,
    updateProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}