import { useEffect, useState } from "react";

function getIdFromUrl(url) {
  return url.split("/").filter(Boolean).at(-1);
}

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function loadPokemons() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      const data = await response.json();
      setPokemons(data.results);
    }
    loadPokemons();
  }, []);

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
