import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const name = query.trim().toLowerCase();
    if (!name) {
      setError("Type a Pokémon name or number first.");
      return;
    }
    setError("");
    navigate(`/pokemon/${encodeURIComponent(name)}`);
  }

  return (
    <section className="search">
      <form onSubmit={handleSubmit}>
        <label htmlFor="pokemon-search">Search by name or number</label>
        <div><input id="pokemon-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Pikachu or 25" /><button type="submit">Search</button></div>
      </form>
      {error && <p className="status status-error" role="alert">{error}</p>}
    </section>
  );
}

export default SearchForm;
