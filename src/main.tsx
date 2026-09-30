import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import AppBootstrap from "./components/AppBootstrap/AppBootstrap";
import { store } from "./store/store";
import { router } from "./router";

import './styles/globals.css';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppBootstrap>
        <RouterProvider router={router} />
      </AppBootstrap>
    </Provider>
  </StrictMode>
);