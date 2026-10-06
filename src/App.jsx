import PokemonList from "./components/PokemonList.jsx";
import SearchForm from "./components/SearchForm.jsx";

function App() {
  return (
    <main className="app">
      <h1>Pokédex Mini</h1>
      <p>Discover the original Pokémon of the Kanto region.</p>
      <SearchForm />
      <PokemonList />
    </main>
  );
}

export default App;
