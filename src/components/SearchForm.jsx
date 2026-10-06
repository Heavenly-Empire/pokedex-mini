import { useState } from "react";

function SearchForm() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const name = query.trim().toLowerCase();
    if (!name) {
      setError("Type a Pokémon name or number first.");
      setResult(null);
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!response.ok) throw new Error(`No Pokémon named “${name}” was found.`);
      setResult(await response.json());
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="search">
      <form onSubmit={handleSubmit}>
        <label htmlFor="pokemon-search">Search by name or number</label>
        <div><input id="pokemon-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Pikachu or 25" /><button type="submit">Search</button></div>
      </form>
      {isLoading && <p className="status">Looking up {query}…</p>}
      {error && <p className="status status-error" role="alert">{error}</p>}
      {result && <p className="search-result"><img src={result.sprites.front_default} alt="" width="72" height="72" /><strong>{result.name}</strong><span>{result.types.map(({ type }) => type.name).join(", ")}</span></p>}
    </section>
  );
}

export default SearchForm;
