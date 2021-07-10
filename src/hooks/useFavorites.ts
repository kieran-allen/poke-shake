import { useState } from "react";
import { FavoritesType } from "../types";
import { getFavoritesCacheKey } from "../utils/getFavoritesCacheKey";

export function useFavorites(): [
  FavoritesType,
  (pokemonName: string) => void,
  (pokemonName: string) => boolean
] {
  const pokemonFavorites = localStorage.getItem("pokemon-favorites");
  const [get, set] = useState<FavoritesType>(
    pokemonFavorites ? [...JSON.parse(pokemonFavorites)] : []
  );

  function addFavorite(pokemonName: string) {
    if (!isFavorite(pokemonName)) {
      const newFavorites: string[] = pokemonFavorites
        ? [pokemonName, ...JSON.parse(pokemonFavorites)]
        : [pokemonName];
      localStorage.setItem("pokemon-favorites", JSON.stringify(newFavorites));
      set(newFavorites);
    } else {
      const newFavorites: string[] = pokemonFavorites
        ? (JSON.parse(pokemonFavorites) as string[]).filter(
            (i) => i !== pokemonName
          )
        : [];
      localStorage.setItem("pokemon-favorites", JSON.stringify(newFavorites));
      set(newFavorites);
    }
  }

  function isFavorite(pokemonName: string) {
    return get.some((i) => i === pokemonName);
  }

  return [get, addFavorite, isFavorite];
}
