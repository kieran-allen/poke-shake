export type FlavorTextEntriesType = {
  flavor_text: string;
  language: LanguageType;
}

export type FindPokemonResponse = {
  id: number;
  name: string;
  flavor_text_entries: FlavorTextEntriesType[];
};

export type LanguageType = {
  name: string;
}