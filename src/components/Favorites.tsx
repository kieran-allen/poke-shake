import React from "react";
import { FavoritesType } from "../types";

type Props = {
  favorites: FavoritesType;
};

export function Favorites({ favorites }: Props) {
  if (!favorites.length) return null;

  return (
    <section id="favorites">
      <header>
        <h2>My favorites:</h2>
      </header>
      <ul>
        {favorites.map((f, idx) => (
          <li key={idx}><a href={`/?pokemon=${f}`}>{f}</a></li>
        ))}
      </ul>
    </section>
  );
}
