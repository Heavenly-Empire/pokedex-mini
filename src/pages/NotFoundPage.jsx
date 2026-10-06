import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="not-found">
      <span>404</span>
      <h1>This route escaped its Poké Ball.</h1>
      <p>The page does not exist, but the Kanto Pokédex is still nearby.</p>
      <Link to="/">Return home</Link>
    </section>
  );
}

export default NotFoundPage;
