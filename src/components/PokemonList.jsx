import { useEffect, useState } from "react";

function getIdFromUrl(url) {
  return url.split("/").filter(Boolean).at(-1);
}

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
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
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
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt="" width="64" height="64" />
            <span>#{id.padStart(3, "0")}</span>
            <strong>{pokemon.name}</strong>
          </li>
        );
      })}
    </ul>
  );
}

export default PokemonList;
