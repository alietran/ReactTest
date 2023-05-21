import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";
const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <BrowserRouter>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </BrowserRouter>
);
