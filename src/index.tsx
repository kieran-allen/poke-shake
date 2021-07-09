import './style.css';

import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

const anchor = document.getElementById("app");
const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  anchor
);
