import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Nav from "../../components/Nav/Nav.jsx";
import StatBar from "../../components/StatBar/StatBar.jsx";
import { fetchCharacter, kiToScore, inferSide } from "../../helpers/api.js";
import { useFavorites } from "../../context/FavoritesContext.jsx";
import "./CharacterDetail.css";

function deriveStats(character) {
  const power = kiToScore(character.maxKi || character.ki);
  const seed = Number(character.id) || 1;
  const r = (n) => ((seed * (n + 7)) % 30) / 100; // 0..0.3
  return {
    power,
    strength: Math.round(power * (0.85 + r(1))),
    speed: Math.round(power * (0.75 + r(2))),
    durability: Math.round(power * (0.8 + r(3))),
  };
}

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const { isFavorite, toggle } = useFavorites();

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetchCharacter(id)
      .then((data) => {
        if (cancelled) return;
        setCharacter(data);
        setStatus("done");
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === "loading") {
    return (
      <>
        <Nav />
        <div className="container">
          <p style={{ padding: "var(--space-7) 0" }}>Laden…</p>
        </div>
      </>
    );
  }

  if (status === "error" || !character) {
    return (
      <>
        <Nav />
        <div className="container">
          <p style={{ padding: "var(--space-7) 0" }}>
            Character niet gevonden{error ? `: ${error}` : ""}.
          </p>
          <Link to="/" className="btn-primary">
            Terug naar Discover
          </Link>
        </div>
      </>
    );
  }

  const stats = deriveStats(character);
  const side = inferSide(character);
  const fav = isFavorite(character.id);

  return (
    <div className="detail">
      <Nav />
      <div className="container">
        <Link to="/" className="detail-back">
          ← Terug naar rooster
        </Link>

        <section className="detail-hero">
          <div className="detail-media">
            <img src={character.image} alt={character.name} />
          </div>
          <div className="detail-body">
            <p className="discover-kicker">// {side}</p>
            <h1 className="detail-name">{character.name}</h1>

            <div className="detail-meta">
              <span className="tag">{character.race || "Unknown"}</span>
              <span className="tag">{character.gender || "Unknown"}</span>
              {character.affiliation && (
                <span className="tag">{character.affiliation}</span>
              )}
              {character.originPlanet?.name && (
                <span className="tag">🪐 {character.originPlanet.name}</span>
              )}
            </div>

            <div className="detail-ki">
              <div>
                <strong>Base Ki</strong>
                <span>{character.ki}</span>
              </div>
              <div>
                <strong>Max Ki</strong>
                <span>{character.maxKi}</span>
              </div>
            </div>

            <p className="detail-bio">{character.description}</p>

            <div className="detail-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={() => toggle(character.id)}
              >
                {fav ? "★ In favorieten" : "☆ Voeg toe aan favorieten"}
              </button>
              <Link to="/" className="btn-ghost">
                Andere warriors
              </Link>
            </div>
          </div>
        </section>

        <div className="detail-sections">
          <article className="panel">
            <h2>Power Stats</h2>
            <div className="stats">
              <StatBar label="Power" value={stats.power} />
              <StatBar label="Strength" value={stats.strength} />
              <StatBar label="Speed" value={stats.speed} />
              <StatBar label="Durability" value={stats.durability} />
            </div>
          </article>

          <article className="panel">
            <h2>Transformations</h2>
            {character.transformations && character.transformations.length > 0 ? (
              <div className="transformations">
                {character.transformations.map((t) => (
                  <figure key={t.id}>
                    <img src={t.image} alt={t.name} loading="lazy" />
                    <figcaption>{t.name}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <p style={{ color: "var(--color-text-muted)" }}>
                Geen transformaties bekend.
              </p>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;
