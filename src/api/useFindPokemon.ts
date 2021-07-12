import { useQuery } from "react-query";
import type { FindPokemonResponse } from "../types";
import { generateSpritURL } from "../utils/generateSpriteURL";

export function useFindPokemon(name: string) {
  const prunedName = name.toLowerCase().trim();
  const cacheKey = `find-pokemon-${prunedName}`;
  const storeageData = localStorage.getItem(cacheKey);
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
      ...(storeageData ? { initialData: JSON.parse(storeageData) } : {}),
      retry: 1,
      staleTime: Infinity,
      onSuccess: (data) => {
        // begin loading image as soon as we get pokemon data.
        new Image().src = generateSpritURL(data.id);
        localStorage.setItem(cacheKey, JSON.stringify(data));
      },
      onSettled: () => {
        console.info('h');
      },
    }
  );
}
