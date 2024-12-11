import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AppRoutes from "./router/AppRoutes.jsx";
import { SnackbarProvider } from "./context/SnackbarProvider.jsx";
import { Provider } from "react-redux";
import store from './redux/store.js'

const root = document.getElementById("root");
createRoot(root).render(
  <Provider store={store}>
    <StrictMode>
      <SnackbarProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </SnackbarProvider>
    </StrictMode>
  </Provider>
);
