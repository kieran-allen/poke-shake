import React from "react";
import { UseQueryResult } from "react-query";
import { FindPokemonResponse, GetShakespeareanResponse } from "../types";
import { generateSpritURL } from "../utils/generateSpriteURL";
import { Error } from "./Error";

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
  return (
    <section id="pokemon-section">
      {pokemon.isError || shakespearean.isError ? (
        <Error errorMessage="We ran into an issue fetching data. Please make sure that the pokemon name is spelled correctly." />
      ) : pokemon.isLoading || shakespearean.isLoading ? (
        <p>fetching data...</p>
      ) : (
        pokemon.isSuccess &&
        shakespearean.isSuccess && (
          <div data-testid="pokemon-success">
            <header>
              <img
                data-testid="sprite-img"
                src={generateSpritURL(pokemon.data.id)}
                alt={`Picture depicting the pokemon called ${pokemon.data.name}.`}
              />
              <h2>{pokemon.data.name} ff</h2>
            </header>
            <button
              data-testid="pokemon-toggle-favorite-button"
              type="button"
              id="add-to-favorites"
              aria-label={
                isFavorite(pokemon.data.name)
                  ? `Remove ${pokemon.data.name} from favorites`
                  : `Add ${pokemon.data.name} to favorites`
              }
              onClick={() => setFavorite(pokemon.data.name)}
            >
              {isFavorite(pokemon.data.name)
                ? "Remove from favorites"
                : "Add to favorites"}
            </button>
            <p>{shakespearean.data.contents.translated}</p>
          </div>
        )
      )}
    </section>
  );
}
