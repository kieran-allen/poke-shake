import React, { ChangeEvent, useState } from "react";
import { useFindPokemon } from "./api/useFindPokemon";
import { useGetShakespearean } from "./api/useGetShakespearean";
import { useDebounce } from "./hooks/useDebounce";
import { filterEnglishFlavorTextEntries } from "./utils/filterEnglishFlavorTextEntries";

export function App() {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 1000);
  const pokemon = useFindPokemon(debouncedSearchValue);
  const shakespearean = useGetShakespearean(pokemon);

  console.info(shakespearean);

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
      />
      {pokemon.data && (
        <>
          <h2>{pokemon.data.name}</h2>
          <ul>
            {filterEnglishFlavorTextEntries(
              pokemon.data.flavor_text_entries
            ).map((entry, idx) => (
              <li key={idx}>{entry.flavor_text}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
