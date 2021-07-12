import { render } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import { useFavorites } from "./useFavorites";

describe("useFavorites", () => {
  afterEach(() => {
    localStorage.removeItem("pokemon-favorites");
  });

  it("should return an empty array if none in localstore", () => {
    localStorage.setItem("pokemon-favorites", JSON.stringify([]));
    const { result } = renderHook(() => useFavorites());
    expect(result.current[0]).toHaveLength(0);
  });

  it("should return all cached favorites from localstorage", () => {
    localStorage.setItem(
      "pokemon-favorites",
      JSON.stringify(["mew", "foo", "doo"])
    );
    const { result } = renderHook(() => useFavorites());
    expect(result.current[0]).toHaveLength(3);
  });

  it("should add favorite to array of favorites", () => {
    localStorage.setItem("pokemon-favorites", JSON.stringify([]));
    const { result } = renderHook(() => useFavorites());
    expect(result.current[0]).toHaveLength(0);
    act(() => {
      result.current[1]("foo");
    });
    expect(result.current[0]).toHaveLength(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "pokemon-favorites",
      JSON.stringify(["foo"])
    );
  });
});
