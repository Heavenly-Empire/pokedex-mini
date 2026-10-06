const FAVORITES_KEY = "pokedex-favorites";

export function readFavorites(storage) {
  try {
    const saved = JSON.parse((storage ?? window.localStorage).getItem(FAVORITES_KEY));
    if (!Array.isArray(saved)) return [];
    return [...new Set(saved.filter((id) => Number.isSafeInteger(id) && id > 0))];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites, storage) {
  try {
    (storage ?? window.localStorage).setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  } catch {
    return false;
  }
}
