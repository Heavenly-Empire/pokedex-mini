import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="app">
      <header><Link to="/"><h1>Pokédex Mini</h1></Link></header>
      <main><Outlet /></main>
      <footer>Data and artwork from PokéAPI.</footer>
    </div>
  );
}

export default Layout;
