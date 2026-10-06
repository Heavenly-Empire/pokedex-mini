import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link to="/" className="brand" aria-label="Pokédex Mini home">
          <span className="brand-mark" aria-hidden="true"><i /></span>
          <span>Pokédex <strong>Mini</strong></span>
        </Link>
        <span className="region-label">Kanto field guide</span>
      </header>
      <main><Outlet /></main>
      <footer>
        <p>Built with React and <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">PokéAPI</a>.</p>
      </footer>
    </div>
  );
}

export default Layout;
