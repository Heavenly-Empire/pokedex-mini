# Pokédex Mini

A responsive React Pokédex for the original 151 Pokémon. The project uses PokéAPI, nested React Router routes, cleanup-safe data fetching, controlled search, client-side filtering, and GitHub Pages deployment.

## Run locally

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run build
```

## Deploy

The Vite base is set to `/pokedex-mini/` and routing uses `HashRouter`, so detail URLs continue to work after a refresh on GitHub Pages.

```bash
npm run deploy
```

Then select the `gh-pages` branch in **Repository settings → Pages**.

Data and official artwork are provided by [PokéAPI](https://pokeapi.co/).
