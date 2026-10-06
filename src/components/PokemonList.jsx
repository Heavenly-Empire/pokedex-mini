import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL, POKEMON_LIMIT } from "../config.js";
import { getIdFromUrl, getSpriteUrl, formatId } from "../utils.js";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
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
        if (isCurrent) setPokemons(data.results);
      } catch (requestError) {
        if (isCurrent) setError(requestError.message);
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }
    loadPokemons();
    return () => { isCurrent = false; };
  }, []);

  if (isLoading) return <p className="status">Loading Pokémon…</p>;
  if (error) return <p className="status status-error">Couldn’t load the list: {error}</p>;

  return (
    <ul className="pokemon-list">
      {pokemons.map((pokemon) => {
        const id = getIdFromUrl(pokemon.url);
        return (
          <li key={pokemon.name}>
            <Link to={`/pokemon/${pokemon.name}`}>
              <img src={getSpriteUrl(id)} alt="" width="64" height="64" />
              <span>{formatId(id)}</span>
              <strong>{pokemon.name}</strong>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default PokemonList;
