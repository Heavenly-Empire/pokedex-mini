import SearchForm from "../components/SearchForm.jsx";
import PokemonList from "../components/PokemonList.jsx";
import { useNavigate } from "react-router-dom";

function ListPage() {
  const navigate = useNavigate();

  function surpriseMe() {
    navigate(`/pokemon/${Math.floor(Math.random() * 151) + 1}`);
  }

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Pocket research lab · 001–151</p>
          <h1>Every great trainer starts with a <em>curious look.</em></h1>
          <p>Search the original Kanto Pokédex, compare base stats, and learn what makes each Pokémon distinct.</p>
          <SearchForm />
          <button className="surprise-button" type="button" onClick={surpriseMe}>
            <span aria-hidden="true">✦</span> Surprise me
          </button>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <span className="orbit-ring" />
          <span className="hero-ball"><i /></span>
          <b>151</b><small>species logged</small>
        </div>
      </section>
      <PokemonList />
    </>
  );
}

export default ListPage;
