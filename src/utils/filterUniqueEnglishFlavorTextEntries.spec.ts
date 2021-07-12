import type { FlavorTextEntriesType } from "../types";
import { filterUniqueEnglishFlavorTextEntries } from "./filterUniqueEnglishFlavorTextEntries";

const mockEntries: FlavorTextEntriesType[] = [
  {
    flavor_text: "gaz",
    language: {
      name: "en",
    },
  },
  {
    flavor_text: "foo\u000c",
    language: {
      name: "en",
    },
  },
  {
    flavor_text: "bar",
    language: {
      name: "fr",
    },
  },
  {
    flavor_text: "gaz",
    language: {
      name: "en",
    },
  },
];

describe("filterUniqueEnglishFlavorTextEntries", () => {
  it("should only return unique english variations flavor_text and replace null charectar with space", () => {
    expect(filterUniqueEnglishFlavorTextEntries(mockEntries)).toEqual([
      "gaz",
      "foo ",
    ]);
  });
});
