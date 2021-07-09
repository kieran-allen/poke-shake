import { FlavorTextEntriesType } from "../types";

export function filterEnglishFlavorTextEntries(
  entries: FlavorTextEntriesType[]
) {
  return entries.filter(({ language }) => language.name.includes("en"));
}
