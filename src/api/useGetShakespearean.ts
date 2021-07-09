import { useQuery, UseQueryResult } from "react-query";
import type { FindPokemonResponse } from "../types";
import { filterEnglishFlavorTextEntries } from "../utils/filterEnglishFlavorTextEntries";

export function useGetShakespearean(
  pokemon: UseQueryResult<FindPokemonResponse, unknown>
) {
  const text = filterEnglishFlavorTextEntries(
    pokemon.data?.flavor_text_entries ?? []
  )
    .map(({ flavor_text }) => flavor_text)
    .join();
  return useQuery<unknown>(
    `${pokemon.data?.id}`,
    async () => {
      const req = await fetch(
        "https://api.funtranslations.com/translate/shakespeare",
        {
          credentials: "include",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: "hello" }),
        }
      );

      if (!req.ok) throw Error();

      const data = await req.json();
      return data;
    },
    {
      enabled: pokemon.status === "success",
      staleTime: Infinity,
    }
  );
}
