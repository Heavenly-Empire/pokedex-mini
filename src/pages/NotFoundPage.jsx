import { Link } from "react-router-dom";

function NotFoundPage() {
  return <section className="status"><h2>There’s nothing here.</h2><Link to="/">Back to the Pokédex</Link></section>;
}

export default NotFoundPage;
