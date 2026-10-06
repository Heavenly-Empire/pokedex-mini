import { SPRITE_BASE_URL } from "./config.js";

export function getIdFromUrl(url) {
  const parts = url.split("/").filter(Boolean);
  return Number(parts.at(-1));
}

export function capitalize(value = "") {
  return value.charAt(0).toUpperCase() + value.slice(1).replaceAll("-", " ");
}

export function formatId(id) {
  return `#${String(id).padStart(3, "0")}`;
}

export function getSpriteUrl(id) {
  return `${SPRITE_BASE_URL}/${id}.png`;
}
