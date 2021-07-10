export function useSetFavorite() {
  return function (pokemonId: string, pokemonData: Object) {
    localStorage.setItem(pokemonId, JSON.stringify(pokemonData));
  };
}
