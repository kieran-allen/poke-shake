import { useQuery } from "react-query";
import type { FindPokemonResponse } from "../types";

export function useFindPokemon(name: string) {
  const prunedName = name.toLowerCase().trim();
  const cacheKey = `find-pokemon-${prunedName}`;
  return useQuery<FindPokemonResponse>(
    cacheKey,
    async () => {
      const req = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${prunedName}`
      );
      if (!req.ok) throw Error();
      const data = await req.json();
      return data;
    },
    {
      enabled: !!prunedName,
      retry: 3,
      staleTime: Infinity,
    }
  );
}
