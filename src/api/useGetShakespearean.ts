import { useQuery, UseQueryResult } from "react-query";
import type { FindPokemonResponse } from "../types";
import { filterUniqueEnglishFlavorTextEntries } from "../utils/filterUniqueEnglishFlavorTextEntries";

export function useGetShakespearean(
  pokemon: UseQueryResult<FindPokemonResponse, unknown>
) {
  const text = filterUniqueEnglishFlavorTextEntries(
    pokemon.data?.flavor_text_entries ?? []
  )
    .map((flavor_text) => flavor_text)
    .join();
  console.info(text);
  // return useQuery<unknown>(
  //   `${pokemon.data?.id}`,
  //   async () => {
  //     const req = await fetch(
  //       `https://api.funtranslations.com/translate/shakespeare.json?text=${text}`
  //     );
  //     if (!req.ok) throw Error();
  //     const data = await req.json();
  //     return data;
  //   },
  //   {
  //     enabled: false,
  //     staleTime: Infinity,
  //     retry: false,
  //   }
  // );
}
