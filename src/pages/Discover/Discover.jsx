import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav/Nav.jsx";
import CharCard from "../../components/CharCard/CharCard.jsx";
import { fetchCharacters, kiToScore, inferSide } from "../../helpers/api.js";
import "./Discover.css";

function Discover() {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [minKi, setMinKi] = useState(0);
  const [side, setSide] = useState("all"); // all | hero | villain
  const [race, setRace] = useState("all");
  const [gender, setGender] = useState("all");
  const [planet, setPlanet] = useState("all");
  const [hasTransformations, setHasTransformations] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetchCharacters()
      .then((items) => {
        if (cancelled) return;
        setCharacters(items);
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
  }, []);

  const races = useMemo(() => {
    const set = new Set(characters.map((c) => c.race).filter(Boolean));
    return ["all", ...Array.from(set).sort()];
  }, [characters]);

  const genders = useMemo(() => {
    const set = new Set(characters.map((c) => c.gender).filter(Boolean));
    return ["all", ...Array.from(set).sort()];
  }, [characters]);

  const planets = useMemo(() => {
    const set = new Set(
      characters.map((c) => c.originPlanet?.name).filter(Boolean)
    );
    return ["all", ...Array.from(set).sort()];
  }, [characters]);

  const filtered = useMemo(() => {
    return characters.filter((c) => {
      if (query && !c.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (side !== "all" && inferSide(c) !== side) return false;
      if (race !== "all" && c.race !== race) return false;
      if (gender !== "all" && c.gender !== gender) return false;
      if (planet !== "all" && c.originPlanet?.name !== planet) return false;
      if (minKi > 0 && kiToScore(c.ki) < minKi) return false;
      if (hasTransformations && !(c.transformations && c.transformations.length > 0))
        return false;
      return true;
    });
  }, [characters, query, side, race, gender, planet, minKi, hasTransformations]);

  function handleRandom() {
    const pool = filtered.length > 0 ? filtered : characters;
    if (pool.length === 0) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    navigate(`/character/${pick.id}`);
  }

  function resetFilters() {
    setQuery("");
    setMinKi(0);
    setSide("all");
    setRace("all");
    setGender("all");
    setPlanet("all");
    setHasTransformations(false);
  }

  return (
    <div className="discover">
      <Nav />

      <div className="container">
        <header className="discover-hero">
          <p className="discover-kicker">// Karakter rooster</p>
          <h1 className="discover-title">
            Verken <span className="text-energy">Warriors</span>
          </h1>
          <p className="discover-lead">
            Veel mensen kennen de Dragon Ball-personages niet. Met DB search ontdek je hun
            naam, ras, gender, ki, total ki, affiliation en oorsprong — of laat het lot
            beslissen met de <span className="text-energy">Random</span>-knop.
          </p>
        </header>

        <div className="discover-layout">
          <aside className="filters" aria-label="Filters">
            <h2>Filters</h2>

            <div className="filters-group">
              <label htmlFor="ki" className="filters-label">
                Min. Power
                <span>{minKi}</span>
              </label>
              <input
                id="ki"
                type="range"
                min="0"
                max="100"
                step="5"
                value={minKi}
                onChange={(e) => setMinKi(Number(e.target.value))}
              />
            </div>

            <div className="filters-group">
              <span className="filters-label">Side</span>
              <div className="filters-chips">
                {["all", "hero", "villain"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSide(s)}
                    className={
                      side === s ? "filters-chip filters-chip-on" : "filters-chip"
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="filters-group">
              <label htmlFor="race" className="filters-label">
                Race
              </label>
              <select
                id="race"
                value={race}
                onChange={(e) => setRace(e.target.value)}
                className="filters-select"
              >
                {races.map((r) => (
                  <option key={r} value={r}>
                    {r === "all" ? "All races" : r}
                  </option>
                ))}
              </select>
            </div>

            <div className="filters-group">
              <label htmlFor="gender" className="filters-label">
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="filters-select"
              >
                {genders.map((g) => (
                  <option key={g} value={g}>
                    {g === "all" ? "All genders" : g}
                  </option>
                ))}
              </select>
            </div>

            <div className="filters-group">
              <label htmlFor="planet" className="filters-label">
                Origin planet
              </label>
              <select
                id="planet"
                value={planet}
                onChange={(e) => setPlanet(e.target.value)}
                className="filters-select"
              >
                {planets.map((p) => (
                  <option key={p} value={p}>
                    {p === "all" ? "All planets" : p}
                  </option>
                ))}
              </select>
            </div>

            <button type="button" className="btn-ghost" onClick={resetFilters}>
              Reset
            </button>
          </aside>

          <section className="discover-main">
            <div className="discover-toolbar">
              <form
                className="search"
                role="search"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="search"
                  placeholder="Zoek op naam..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Zoek op naam"
                />
              </form>
              <button
                type="button"
                className="btn-primary discover-random"
                onClick={handleRandom}
                disabled={status !== "done"}
                title="Toon een random warrior"
              >
                🎲 Random
              </button>
            </div>

            {status === "loading" && (
              <p className="empty">Laden van warriors…</p>
            )}
            {status === "error" && (
              <p className="empty">Er ging iets mis: {error}</p>
            )}
            {status === "done" && (
              <>
                <p className="discover-count">
                  {filtered.length} van {characters.length} warriors
                </p>
                {filtered.length === 0 ? (
                  <p className="empty">Geen resultaten — pas je filters aan.</p>
                ) : (
                  <div className="grid">
                    {filtered.map((c) => (
                      <CharCard key={c.id} character={c} />
                    ))}
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Discover;
