import React from "react";
import { render } from "@testing-library/react";
import { Favorites } from "./Favorites";
import type { FavoritesType } from "../types";

const EMPTY_FAV: FavoritesType = [];
const FAVORITES: FavoritesType = ["mew", "mewtwo"];

describe("Favorites", () => {
  it("should render an empty favorites component", () => {
    const { queryByTestId } = render(<Favorites favorites={EMPTY_FAV} />);
    expect(queryByTestId(/favorite-*/)).not.toBeInTheDocument();
  });

  it("should render a non-empty favorites component", () => {
    const { queryAllByTestId, queryByTestId } = render(
      <Favorites favorites={FAVORITES} />
    );
    expect(queryAllByTestId(/^favorite-*/)).toHaveLength(FAVORITES.length);
    expect(queryByTestId("favorite-mew")).toBeInTheDocument();
    expect(queryByTestId("favorite-mewtwo")).toBeInTheDocument();
  });

  it("should direct the user to the correct page from favorite link", () => {
    const { getByTestId } = render(<Favorites favorites={FAVORITES} />);
    expect(getByTestId("link-favorite-mew")).toHaveAttribute(
      "href",
      "/?pokemon=mew"
    );
  });

  it('should show active link if current pokemon and favorite pokemon the same', () => {
    const { getByTestId } = render(<Favorites favorites={FAVORITES} pokemonName="mew" />);
    expect(getByTestId('favorite-mew')).toHaveAttribute('id', 'active-link');
    expect(getByTestId('favorite-mewtwo')).not.toHaveAttribute('id', 'active-link');
  });
});
