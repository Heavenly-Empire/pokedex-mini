import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL, POKEMON_LIMIT } from "../config.js";
import { getIdFromUrl } from "../utils.js";
import PokemonCard from "./PokemonCard.jsx";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    async function loadPokemons() {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(`${API_BASE_URL}/pokemon?limit=${POKEMON_LIMIT}`);
        if (!response.ok) throw new Error(`Server responded with status ${response.status}`);
        const data = await response.json();
        if (isCurrent) {
          setPokemons(data.results.map((pokemon) => ({ ...pokemon, id: getIdFromUrl(pokemon.url) })));
        }
      } catch (requestError) {
        if (isCurrent) setError(requestError.message);
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }

    loadPokemons();
    return () => { isCurrent = false; };
  }, []);

  const visiblePokemons = useMemo(() => {
    const value = filter.trim().toLowerCase();
    if (!value) return pokemons;
    return pokemons.filter(({ name, id }) => name.includes(value) || String(id) === value.replace(/^#/, ""));
  }, [filter, pokemons]);

  if (isLoading) {
    return <div className="state-card"><span className="loader" /><p>Opening the Pokédex…</p></div>;
  }

  if (error) {
    return <div className="state-card error-state" role="alert"><b>Couldn’t load the list.</b><p>{error}</p><button onClick={() => window.location.reload()}>Try again</button></div>;
  }

  return (
    <section className="collection" aria-labelledby="collection-heading">
      <div className="collection-heading">
        <div>
          <p className="eyebrow">Generation I</p>
          <h2 id="collection-heading">Kanto collection</h2>
        </div>
        <label className="filter-control">
          <span className="sr-only">Filter the collection</span>
          <input value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="Filter 151 Pokémon" />
          <span>{visiblePokemons.length}</span>
        </label>
      </div>
      {visiblePokemons.length ? (
        <ul className="pokemon-grid">
          {visiblePokemons.map((pokemon, index) => <PokemonCard key={pokemon.name} pokemon={pokemon} index={index} />)}
        </ul>
      ) : (
        <div className="empty-state"><span>?</span><h3>No match found</h3><p>Try a different name or Pokédex number.</p></div>
      )}
    </section>
  );
}

export default PokemonList;
