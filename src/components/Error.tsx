import React from "react";

type Props = {
  errorMessage: string;
};
export function Error({ errorMessage }: Props) {
  return (
    <div data-testid="error" id="error">
      <p>{errorMessage}</p>
    </div>
  );
}
