import React, { ChangeEvent, useState } from "react";
import { useFindPokemon } from "./api/useFindPokemon";
import { useDebounce } from "./hooks/useDebounce";

export function App() {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 1000);
  const { data } = useFindPokemon(debouncedSearchValue);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  return (
    <>
      <input type="text" value={searchValue} onChange={handleOnChange} />
      <code>{data && JSON.stringify(data)}</code>
    </>
  );
}
