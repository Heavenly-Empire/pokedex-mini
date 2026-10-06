import test from "node:test";
import assert from "node:assert/strict";
import { readFavorites, saveFavorites } from "../src/favorites.js";

function storageWith(value = null) {
  return {
    getItem: () => value,
    setItem: (_key, nextValue) => { value = nextValue; },
  };
}

test("favorites can be saved, reloaded, and removed without losing other entries", () => {
  const storage = storageWith();
  assert.deepEqual(readFavorites(storage), []);
  assert.equal(saveFavorites([25, 6], storage), true);
  assert.deepEqual(readFavorites(storage), [25, 6]);
  assert.equal(saveFavorites(readFavorites(storage).filter((id) => id !== 25), storage), true);
  assert.deepEqual(readFavorites(storage), [6]);
  assert.equal(saveFavorites([], storage), true);
  assert.deepEqual(readFavorites(storage), []);
});

test("malformed or unexpected saved values do not crash the page", () => {
  for (const value of ["broken", "{}", "25", "null", '"text"']) {
    assert.deepEqual(readFavorites(storageWith(value)), []);
  }
  assert.deepEqual(readFavorites(storageWith('[25,25,-1,0,"6",null,6,1.5]')), [25, 6]);
});

test("unavailable storage and write failures are handled", () => {
  const blocked = {
    getItem: () => { throw new Error("Storage blocked"); },
    setItem: () => { throw new Error("Storage full"); },
  };
  assert.deepEqual(readFavorites(blocked), []);
  assert.equal(saveFavorites([25], blocked), false);
});
