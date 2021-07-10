import { useQuery, UseQueryResult } from "react-query";
import type { FindPokemonResponse } from "../types";
import { filterUniqueEnglishFlavorTextEntries } from "../utils/filterUniqueEnglishFlavorTextEntries";

export function useGetShakespearean(
  pokemon: UseQueryResult<FindPokemonResponse, unknown>
) {
  const cacheKey = `shakespear-${pokemon.data?.id}`;
  const storeageData = localStorage.getItem(cacheKey);
  const text = filterUniqueEnglishFlavorTextEntries(
    pokemon.data?.flavor_text_entries ?? []
  )
    .map((flavor_text) => flavor_text)
    .join();
  return useQuery<unknown>(
    cacheKey,
    async () => {
      const req = await fetch(
        `https://api.funtranslations.com/translate/shakespeare.json?text=${text}`
      );
      if (!req.ok) throw Error();
      const data = await req.json();
      return data;
    },
    {
      ...(storeageData ? { initialData: JSON.parse(storeageData) } : {}),
      onSuccess: (data) => {
        localStorage.setItem(cacheKey, JSON.stringify(data));
      },
      enabled: !!pokemon.data,
      staleTime: Infinity,
      retry: false,
    }
  );
}
