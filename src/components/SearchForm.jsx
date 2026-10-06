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
    <div className="search-wrap">
      <form className="search-form" onSubmit={handleSubmit} role="search">
        <label className="sr-only" htmlFor="pokemon-search">Search Pokémon</label>
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input
          id="pokemon-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try Pikachu or 25"
          autoComplete="off"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="form-error" role="alert">{error}</p>}
    </div>
  );
}

export default SearchForm;
