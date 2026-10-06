import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function DetailPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;
    async function loadPokemon() {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) throw new Error(`No Pokémon named “${name}” was found.`);
        const data = await response.json();
        if (isCurrent) setPokemon(data);
      } catch (requestError) {
        if (isCurrent) setError(requestError.message);
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }
    loadPokemon();
    return () => { isCurrent = false; };
  }, [name]);

  if (isLoading) return <p className="status">Loading {name}…</p>;
  if (error) return <p className="status status-error">{error}</p>;

  return (
    <article className="detail">
      <Link to="/">← Back to list</Link>
      <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} width="260" height="260" />
      <h2>{pokemon.name}</h2>
      <p>{pokemon.types.map(({ type }) => type.name).join(", ")}</p>
      <ul>{pokemon.stats.map(({ base_stat: value, stat }) => <li key={stat.name}><span>{stat.name}</span><strong>{value}</strong></li>)}</ul>
    </article>
  );
}

export default DetailPage;
