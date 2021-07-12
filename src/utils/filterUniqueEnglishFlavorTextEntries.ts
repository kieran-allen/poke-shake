import { FlavorTextEntriesType } from "../types";

export function filterUniqueEnglishFlavorTextEntries(
  entries: FlavorTextEntriesType[]
) {
  return [
    ...new Set(
      entries
        .filter(({ language }) => language.name.includes("en"))
        .map(({ flavor_text }) => flavor_text.replace("\u000c", " "))
    ),
  ];
}
