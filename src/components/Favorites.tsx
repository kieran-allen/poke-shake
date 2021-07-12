import React from "react";
import { FavoritesType } from "../types";

type Props = {
  favorites: FavoritesType;
  pokemonName?: string;
};

export function Favorites({ favorites, pokemonName = "" }: Props) {
  return (
    <section id="favorites-section">
      <header>
        <h2>My favorites:</h2>
      </header>
      <ul>
        {favorites.map((f, idx) => (
          <li
            key={idx}
            id={f === pokemonName ? "active-link" : ""}
            data-testid={`favorite-${f}`}
          >
            <a data-testid={`link-favorite-${f}`} href={`/?pokemon=${f}`}>{f}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
