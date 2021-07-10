import React from "react";
import { FavoritesType } from "../types";

type Props = {
  favorites: FavoritesType;
  pokemonName?: string;
};

export function Favorites({ favorites, pokemonName = "" }: Props) {
  if (!favorites.length) return null;

  return (
    <section id="favorites">
      <header>
        <h2>My favorites:</h2>
      </header>
      <ul>
        {favorites.map((f, idx) => (
          <li key={idx} id={f === pokemonName ? "active-link" : ""}>
            <a href={`/?pokemon=${f}`}>{f}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
