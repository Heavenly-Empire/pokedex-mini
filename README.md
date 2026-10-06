# Pokédex Mini

A responsive Pokédex built with React, Vite, React Router, and PokéAPI. Browse the original 151 Pokémon, look up individual entries, explore their stats, and save favorites on your device.

**[Open the live website](https://heavenly-empire.github.io/pokedex-mini/)** · [Try Pikachu](https://heavenly-empire.github.io/pokedex-mini/#/pokemon/pikachu)

## Using the website

1. **Browse:** scroll down to the collection and select a Pokémon card to open its entry.
2. **Search:** enter a name such as `Pikachu`, or an API number such as `25`, then press Enter or select **Search**. Names are trimmed and converted to lowercase before navigation. An empty search shows a validation message; an unknown name shows a helpful error on the detail page.
3. **Filter:** use **Filter 151 Pokémon** above the cards to narrow the collection by part of a name or an exact number, such as `pika`, `25`, or `#25`. The count updates as you type. Filtering happens locally without another API request.
4. **Discover:** select **Surprise me** to open a random entry from the original 151.
5. **Explore an entry:** view its types, height, weight, base experience, abilities, and six base stats. The stat bars and total make entries easier to compare as you browse.
6. **Save a favorite:** select **Save favorite** on an entry; select it again to remove the favorite. Favorites are stored in this browser using local storage and persist after a refresh. They are not synced between devices, and there is no separate favorites list.
7. **Return:** select **← Back**, the **Pokédex Mini** logo, or your browser's Back button to return to the collection.

You can bookmark or share a detail URL, such as `/#/pokemon/pikachu`, and refresh it directly. The collection covers Generation I; name/number search can also open other Pokémon returned by PokéAPI. Artwork floats gently and reacts to card hover or keyboard focus. Animations respect your device's reduced-motion preference.

## Run locally

Use Node.js 22.12 or newer and npm. From a terminal:

```bash
git clone https://github.com/Heavenly-Empire/pokedex-mini.git
cd pokedex-mini
npm ci
npm run dev
```

Open the local URL printed by Vite, including `/pokedex-mini/`. No API key or environment file is required. An internet connection is needed for Pokémon data, artwork, and web fonts.

## Project structure

```text
src/
├── main.jsx                 # React entry point with StrictMode
├── App.jsx                  # HashRouter and nested routes
├── config.js                # API/artwork URLs and collection limit
├── utils.js                 # Shared ID, image, and display helpers
├── index.css                # Responsive styling and animations
├── components/
│   ├── Layout.jsx           # Shared header, footer, and Outlet
│   ├── PokemonList.jsx      # List fetch, loading/error states, filtering
│   ├── PokemonCard.jsx      # Reusable linked Pokémon card
│   └── SearchForm.jsx       # Controlled input, validation, navigation
└── pages/
    ├── ListPage.jsx         # Home page and random discovery
    ├── DetailPage.jsx       # Parameter-based fetch, stats, and favorites
    └── NotFoundPage.jsx     # Unmatched-route fallback
```

## Week 6 concepts

| Topic | Where it is used |
| --- | --- |
| S21: state and fetching | `PokemonList` uses `useState` and `useEffect`, an inner async function, `fetch`, `response.ok`, and `try/catch/finally` to render loading, error, or data states. IDs and artwork URLs come from the list response without fetching every entry individually. |
| S22: controlled forms | `SearchForm` uses `value`/`onChange`, `onSubmit`, `event.preventDefault()`, trimming, lowercase normalization, and empty-input validation. In the final routed version, the form navigates and `DetailPage` owns the fetch. |
| S23: routing and cleanup | `HashRouter`, `Routes`, `Route`, `Link`, `useNavigate`, and `useParams` provide the home, `/pokemon/:name`, and wildcard routes. The detail effect depends on `name`; an `isCurrent` cleanup guard prevents older requests from overwriting the current entry. |
| S24: organization and deployment | Nested routes render through `Layout`'s `Outlet`. API settings and pure helpers live in `config.js` and `utils.js`. Vite's base is `/pokedex-mini/`, and `predeploy`/`deploy` build and publish `dist` to `gh-pages`. |

The finished app extends the tutorial's initial 20-entry list to 151 entries and adds responsive cards, filtering, favorites, stat bars, and animation. The final routed architecture retains the tutorial's separation of responsibilities.

## Validation

```bash
npm run lint
npm run build
npm run preview
```

Open the preview URL printed by Vite. For a manual walkthrough:

- Submit an empty search: a validation message appears without navigating.
- Search `Charizard`: capitalization is normalized and the correct entry opens.
- Search `pikachuu`: an error appears, with a link back to the collection.
- Filter `pika` and then an unmatched name: check the count and empty state.
- Open a card: check artwork, types, and all six stats; return using the logo or Back link.
- Refresh `/#/pokemon/pikachu` on the live site: the entry still loads.
- Visit `/#/nonsense`: the 404 page provides a route home.
- Navigate rapidly between entries: the last selected Pokémon should remain displayed.
- Save a favorite, refresh the entry, and remove it: the saved state should persist and then clear.
- Try a narrow browser window, keyboard navigation, and reduced-motion settings.
- Temporarily block PokéAPI requests in browser developer tools and reload: loading should resolve to an error. Unblock requests and retry to restore the list.

## Deploy changes

Commit and push source changes on `main`, then publish the production build:

```bash
git add src README.md
git commit -m "Describe the change"
git push origin main
npm run deploy
```

`predeploy` runs the build automatically. `main` contains the source code and its history; `gh-pages` contains the static files served by GitHub Pages. Pushing `main` alone does not update the website.

In **Settings → Pages**, select **Deploy from a branch**, then **gh-pages** and **/(root)**. Allow the Pages workflow to finish before testing the live URL. If the browser still displays an older build, perform a hard refresh. If you rename the repository, update Vite's `base` and the `homepage` value in `package.json` before redeploying.

Use Git's credential manager or a repository-scoped credential when authentication is required. Never commit a token, password, or private environment file.

## Data and artwork

Pokémon data comes from [PokéAPI](https://pokeapi.co/), and official artwork comes from the [PokéAPI sprites repository](https://github.com/PokeAPI/sprites). Pokémon names and artwork belong to their respective rights holders. This is an educational project, not an official Pokémon product.
