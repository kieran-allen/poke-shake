export function useGetFavorite(favoriteId: string) {
  return localStorage.getItem(favoriteId) ?? {};
}
