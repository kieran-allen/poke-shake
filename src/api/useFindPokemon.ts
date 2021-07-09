import { useQuery } from "react-query";

export type FindPokemonResponse = {
  id: number;
  name: string;
};

export function useFindPokemon(name: string) {
  const prunedName = name.toLowerCase().trim();
  return useQuery<FindPokemonResponse>(
    `find-pokemon-${prunedName}`,
    async () => {
      const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${prunedName}`);
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
