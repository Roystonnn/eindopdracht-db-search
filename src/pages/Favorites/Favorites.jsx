import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../../components/Nav/Nav.jsx";
import { fetchCharacters, inferSide } from "../../helpers/api.js";
import { useFavorites } from "../../context/FavoritesContext.jsx";
import "./Favorites.css";

function Favorites() {
  const { ids, remove } = useFavorites();
  const [characters, setCharacters] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    fetchCharacters()
      .then((items) => {
        if (cancelled) return;
        setCharacters(items);
        setStatus("done");
      })
      .catch(() => setStatus("error"));
    return () => {
      cancelled = true;
    };
  }, []);

  const list = characters.filter((c) => ids.includes(String(c.id)));

  return (
    <div className="favorites">
      <Nav />
      <div className="container">
        <header className="favorites-head">
          <p className="discover-kicker">// Opgeslagen rooster</p>
          <h1 className="detail-name" style={{ fontSize: 44 }}>
            Jouw Favorieten
          </h1>
          <p style={{ color: "var(--color-text-muted)", marginTop: 12 }}>
            Je persoonlijke selectie van favoriete warriors
          </p>
        </header>

        {status === "loading" && <p>Laden…</p>}

        {status === "done" && list.length === 0 && (
          <div className="empty">
            <p style={{ marginBottom: 16 }}>Nog geen favorieten.</p>
            <Link to="/" className="btn-primary">
              Vind warriors
            </Link>
          </div>
        )}

        {status === "done" && list.length > 0 && (
          <ul className="favorites-list">
            {list.map((c) => (
              <li key={c.id} className="favorites-row">
                <Link to={`/character/${c.id}`} className="favorites-thumb">
                  <img src={c.image} alt={c.name} loading="lazy" />
                </Link>
                <div>
                  <Link to={`/character/${c.id}`}>
                    <h2 className="favorites-name">{c.name}</h2>
                  </Link>
                  <div className="favorites-meta">
                    <span className="tag">{c.race || "Unknown"}</span>
                    <span className="tag">{inferSide(c)}</span>
                    <span className="char-card-ki">⚡ {c.ki}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="favorites-remove"
                  onClick={() => remove(c.id)}
                  aria-label={`Verwijder ${c.name}`}
                >
                  Verwijder
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Favorites;
