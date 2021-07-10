import React from "react";
import { UseQueryResult } from "react-query";
import { FindPokemonResponse, GetShakespeareanResponse } from "../types";
import { generateSpritURL } from "../utils/generateSpriteURL";

type Props = {
  pokemon: UseQueryResult<FindPokemonResponse, unknown>;
  shakespearean: UseQueryResult<GetShakespeareanResponse, unknown>;
  setFavorite: (pokemonName: string) => void;
  isFavorite: (pokemonName: string) => boolean;
};

export function Pokemon({
  pokemon,
  shakespearean,
  setFavorite,
  isFavorite,
}: Props) {
  if (pokemon.isSuccess && shakespearean.isSuccess) {
    return (
      <section id="pokemon-section">
        <header>
          <img
            src={generateSpritURL(pokemon.data.id)}
            alt={`picture depicting the pokemon ${pokemon.data.name}.`}
          />
          <h2>{pokemon.data.name}</h2>
        </header>
        <button
          type="button"
          id="add-to-favorites"
          onClick={() => setFavorite(pokemon.data.name)}
        >
          {isFavorite(pokemon.data.name)
            ? "Remove from favorites"
            : "Add to favorites"}
        </button>
        <p>{shakespearean.data.contents.translated}</p>
      </section>
    );
  }
  return null;
}
