import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext.jsx";
import { inferSide } from "../../helpers/api.js";
import "./CharCard.css";

function CharCard({ character }) {
  const { isFavorite, toggle } = useFavorites();
  const side = inferSide(character);
  const fav = isFavorite(character.id);

  return (
    <article className="char-card">
      <div className="char-card-media">
        <Link to={`/character/${character.id}`} aria-label={`Open ${character.name}`}>
          <img src={character.image} alt={character.name} loading="lazy" />
        </Link>
        <span className={`char-card-side char-card-side--${side}`}>{side}</span>
        <button
          type="button"
          onClick={() => toggle(character.id)}
          aria-label={fav ? "Verwijder uit favorieten" : "Voeg toe aan favorieten"}
          aria-pressed={fav}
          className={fav ? "char-card-fav char-card-fav-on" : "char-card-fav"}
        >
          {fav ? "★" : "☆"}
        </button>
      </div>

      <div className="char-card-body">
        <Link to={`/character/${character.id}`}>
          <h3 className="char-card-name">{character.name}</h3>
        </Link>
        <div className="char-card-meta">
          <span>{character.race || "Unknown"}</span>
          <span className="char-card-ki">⚡ {character.ki}</span>
        </div>
      </div>
    </article>
  );
}

export default CharCard;
