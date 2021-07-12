import React from 'react';
import { render } from "@testing-library/react";
import { Error } from "./Error";

const MESSAGE = "foo";

describe("Error", () => {
  it("Should render the Error component with the given text", () => {
    const { getByText } = render(<Error errorMessage={MESSAGE} />);
    expect(getByText(MESSAGE)).toBeDefined();
  });
});