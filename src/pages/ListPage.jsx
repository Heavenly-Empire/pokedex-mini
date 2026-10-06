import PokemonList from "../components/PokemonList.jsx";
import SearchForm from "../components/SearchForm.jsx";

function ListPage() {
  return (
    <>
      <p>Discover the original Pokémon of the Kanto region.</p>
      <SearchForm />
      <PokemonList />
    </>
  );
}

export default ListPage;
