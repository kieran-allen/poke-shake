import React, { ChangeEvent, useState } from "react";
import { useFindPokemon } from "./api/useFindPokemon";
import { useGetShakespearean } from "./api/useGetShakespearean";
import { useDebounce } from "./hooks/useDebounce";
import { filterUniqueEnglishFlavorTextEntries } from "./utils/filterUniqueEnglishFlavorTextEntries";

export function App() {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 1000);
  const pokemon = useFindPokemon(debouncedSearchValue);
  const shakespearean = useGetShakespearean(pokemon);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  console.info(shakespearean.data);

  return (
    <main>
      <input
        type="text"
        id="search-input"
        value={searchValue}
        onChange={handleOnChange}
        disabled={pokemon.status === "loading"}
      />
      {pokemon.data && (
        <>
          <h2>{pokemon.data.name}</h2>
          <ul>
            {filterUniqueEnglishFlavorTextEntries(
              pokemon.data.flavor_text_entries
            ).map((flavor_text, idx) => (
              <li key={idx}>{flavor_text}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
