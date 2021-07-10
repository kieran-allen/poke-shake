import React, { ChangeEvent, useState } from "react";
import { useFindPokemon } from "./api/useFindPokemon";
import { useGetShakespearean } from "./api/useGetShakespearean";
import { Favorites } from "./components/Favorites";
import { Pokemon } from "./components/Pokemon";
import { useDebounce } from "./hooks/useDebounce";
import { useFavorites } from "./hooks/useFavorites";

export function App() {
  const params = new URLSearchParams(window.location.search);

  const [favorites, setFavorite, isFavorite] = useFavorites();
  const [searchValue, setSearchValue] = useState(params.get("pokemon") ?? "");
  const debouncedSearchValue = useDebounce(searchValue, 1000);
  const pokemon = useFindPokemon(debouncedSearchValue);
  const shakespearean = useGetShakespearean(pokemon);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  return (
    <main>
      <input
        type="text"
        id="search-input"
        value={searchValue}
        onChange={handleOnChange}
        disabled={pokemon.status === "loading"}
        autoFocus
      />
      <Pokemon
        pokemon={pokemon}
        shakespearean={shakespearean}
        setFavorite={setFavorite}
        isFavorite={isFavorite}
      />
      <Favorites favorites={favorites} />
    </main>
  );
}
