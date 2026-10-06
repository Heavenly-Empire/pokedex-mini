import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config.js";
import { capitalize, formatId } from "../utils.js";
import { readFavorites, saveFavorites } from "../favorites.js";

function DetailPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState(() => readFavorites());
  const [favoriteError, setFavoriteError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    async function loadPokemon() {
      setIsLoading(true);
      setError("");
      setPokemon(null);
      setFavoriteError("");
      try {
        const response = await fetch(`${API_BASE_URL}/pokemon/${name}`);
        if (!response.ok) throw new Error(`No Pokémon named “${name}” was found.`);
        const data = await response.json();
        if (isCurrent) {
          setPokemon(data);
          document.title = `${capitalize(data.name)} · Pokédex Mini`;
        }
      } catch (requestError) {
        if (isCurrent) setError(requestError.message);
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }

    loadPokemon();
    return () => {
      isCurrent = false;
      document.title = "Pokédex Mini";
    };
  }, [name]);

  if (isLoading) return <div className="state-card detail-state"><span className="loader" /><p>Finding {name}…</p></div>;
  if (error) return <div className="state-card detail-state error-state"><b>Pokémon not found</b><p>{error}</p><Link to="/">Return to the Pokédex</Link></div>;

  const artwork = pokemon.sprites.other["official-artwork"].front_default;
  const total = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
  const isFavorite = favorites.includes(pokemon.id);

  function toggleFavorite() {
    const currentFavorites = readFavorites();
    const currentlySaved = currentFavorites.includes(pokemon.id);
    const nextFavorites = currentlySaved
      ? currentFavorites.filter((id) => id !== pokemon.id)
      : [...currentFavorites, pokemon.id];
    if (saveFavorites(nextFavorites)) {
      setFavorites(nextFavorites);
      setFavoriteError("");
    } else {
      setFavorites(currentFavorites);
      setFavoriteError("Couldn't save this change. Allow browser storage and try again.");
    }
  }

  return (
    <article className={`detail-page type-${pokemon.types[0].type.name}`}>
      <Link to="/" className="back-link">← Back</Link>
      <div className="detail-hero">
        <div className="detail-copy">
          <p className="eyebrow">Pokédex entry {formatId(pokemon.id)}</p>
          <h1>{capitalize(pokemon.name)}</h1>
          <div className="type-row">
            {pokemon.types.map(({ type }) => <span key={type.name}>{capitalize(type.name)}</span>)}
          </div>
          <button className={`favorite-button${isFavorite ? " is-favorite" : ""}`} type="button" onClick={toggleFavorite} aria-pressed={isFavorite}>
            <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
            {isFavorite ? "Saved to favorites" : "Save favorite"}
          </button>
          {favoriteError && <p className="favorite-error" role="alert">{favoriteError}</p>}
          <dl className="quick-facts">
            <div><dt>Height</dt><dd>{pokemon.height / 10} m</dd></div>
            <div><dt>Weight</dt><dd>{pokemon.weight / 10} kg</dd></div>
            <div><dt>Base XP</dt><dd>{pokemon.base_experience ?? "—"}</dd></div>
          </dl>
        </div>
        <div className="artwork-stage">
          
          <img src={artwork} alt={pokemon.name} width="430" height="430" />
        </div>
      </div>
      <section className="detail-data">
        <div>
          <p className="eyebrow">Battle profile</p>
          <h2>Base stats</h2>
          <ul className="stat-list">
            {pokemon.stats.map(({ base_stat: value, stat }) => (
              <li key={stat.name}>
                <span>{capitalize(stat.name)}</span><b>{value}</b>
                <i><span style={{ width: `${Math.min((value / 180) * 100, 100)}%` }} /></i>
              </li>
            ))}
          </ul>
        </div>
        <div className="ability-panel">
          <p className="eyebrow">Training notes</p>
          <h2>Abilities</h2>
          <ul>
            {pokemon.abilities.map(({ ability, is_hidden: hidden }) => (
              <li key={ability.name}><span>{capitalize(ability.name)}</span>{hidden && <small>Hidden</small>}</li>
            ))}
          </ul>
          <div className="total-stat"><span>Total base stats</span><strong>{total}</strong></div>
        </div>
      </section>
    </article>
  );
}

export default DetailPage;
