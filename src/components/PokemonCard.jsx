import { Link } from "react-router-dom";
import { capitalize, formatId, getSpriteUrl } from "../utils.js";

function PokemonCard({ pokemon, index }) {
  return (
    <li className="pokemon-card" style={{ "--delay": `${Math.min(index * 24, 360)}ms` }}>
      <Link to={`/pokemon/${pokemon.name}`}>
        <span className="card-number">{formatId(pokemon.id)}</span>
        <img src={getSpriteUrl(pokemon.id)} alt="" width="180" height="180" loading="lazy" />
        <span className="card-name">{capitalize(pokemon.name)}</span>
        <span className="card-cta">View entry <span aria-hidden="true">↗</span></span>
      </Link>
    </li>
  );
}

export default PokemonCard;
