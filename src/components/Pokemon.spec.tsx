import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { UseQueryResult } from "react-query";
import type { FindPokemonResponse, GetShakespeareanResponse } from "../types";
import { generateSpritURL } from "../utils/generateSpriteURL";
import { Pokemon } from "./Pokemon";

const mockPokemonQueryError = {
  isError: true,
} as UseQueryResult<FindPokemonResponse, unknown>;
const mockPokemonQueryLoading = {
  isLoading: true,
} as UseQueryResult<FindPokemonResponse, unknown>;
const mockPokemonQuerySuccess = {
  isSuccess: true,
  data: {
    id: 1,
    name: "mew",
  },
} as UseQueryResult<FindPokemonResponse, unknown>;

const mockShakeQueryIdle = {
  isIdle: true,
} as UseQueryResult<GetShakespeareanResponse, unknown>;
const mockShakeQueryError = {
  isError: true,
} as UseQueryResult<GetShakespeareanResponse, unknown>;
const mockShakeQueryLoading = {
  isLoading: true,
} as UseQueryResult<GetShakespeareanResponse, unknown>;
const mockShakeQuerySuccess = {
  isSuccess: true,
  data: {
    contents: {
      translated: "foobar",
    },
  },
} as UseQueryResult<GetShakespeareanResponse, unknown>;

describe("Pokemon", () => {
  it("should render the loading state if a pokemon is still loading", () => {
    const { getByText } = render(
      <Pokemon
        pokemon={mockPokemonQueryLoading}
        shakespearean={mockShakeQueryIdle}
        setFavorite={jest.fn()}
        isFavorite={() => false}
      />
    );
    expect(getByText("fetching data...")).toBeInTheDocument();
  });

  it("should render the loading state if a pokemon is loaded but shakespear text is not", () => {
    const { getByText } = render(
      <Pokemon
        pokemon={mockPokemonQuerySuccess}
        shakespearean={mockShakeQueryLoading}
        setFavorite={jest.fn()}
        isFavorite={() => false}
      />
    );
    expect(getByText("fetching data...")).toBeInTheDocument();
  });

  it("should render the error state if a pokemon has error", () => {
    const { getByTestId } = render(
      <Pokemon
        pokemon={mockPokemonQueryError}
        shakespearean={mockShakeQuerySuccess}
        setFavorite={jest.fn()}
        isFavorite={() => false}
      />
    );
    expect(getByTestId("error")).toBeInTheDocument();
  });

  it("should render the error state if a pokemon is success, but shakespear errors", () => {
    const { getByTestId } = render(
      <Pokemon
        pokemon={mockPokemonQuerySuccess}
        shakespearean={mockShakeQueryError}
        setFavorite={jest.fn()}
        isFavorite={() => false}
      />
    );
    expect(getByTestId("error")).toBeInTheDocument();
  });

  it("should render a success state if both calls return success", () => {
    const { getByTestId } = render(
      <Pokemon
        pokemon={mockPokemonQuerySuccess}
        shakespearean={mockShakeQuerySuccess}
        setFavorite={jest.fn()}
        isFavorite={() => false}
      />
    );
    expect(getByTestId("pokemon-toggle-favorite-button")).toBeInTheDocument();
  });

  it("should call setFavorite with pokemon name if clicked", () => {
    const setFavorite = jest.fn();
    const { getByTestId } = render(
      <Pokemon
        pokemon={mockPokemonQuerySuccess}
        shakespearean={mockShakeQuerySuccess}
        setFavorite={setFavorite}
        isFavorite={() => false}
      />
    );
    fireEvent.click(getByTestId("pokemon-toggle-favorite-button"));
    expect(setFavorite).toBeCalledWith(mockPokemonQuerySuccess.data?.name);
  });

  it("should show correct button text if already a favorite", () => {
    const { getByTestId } = render(
      <Pokemon
        pokemon={mockPokemonQuerySuccess}
        shakespearean={mockShakeQuerySuccess}
        setFavorite={jest.fn()}
        isFavorite={() => true}
      />
    );
    expect(getByTestId("pokemon-toggle-favorite-button").textContent).toEqual(
      "Remove from favorites"
    );
  });

  it("should show correct button text if not already a favorite", () => {
    const { getByTestId } = render(
      <Pokemon
        pokemon={mockPokemonQuerySuccess}
        shakespearean={mockShakeQuerySuccess}
        setFavorite={jest.fn()}
        isFavorite={() => false}
      />
    );
    expect(getByTestId("pokemon-toggle-favorite-button").textContent).toEqual(
      "Add to favorites"
    );
  });

  it("should have the correct sprite url generated", () => {
    const { getByTestId } = render(
      <Pokemon
        pokemon={mockPokemonQuerySuccess}
        shakespearean={mockShakeQuerySuccess}
        setFavorite={jest.fn()}
        isFavorite={() => false}
      />
    );
    expect(getByTestId("sprite-img")).toHaveAttribute(
      "src",
      generateSpritURL(mockPokemonQuerySuccess.data!.id)
    );
  });
});
