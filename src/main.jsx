import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AppRoutes from "./router/AppRoutes.jsx";
import { SnackbarProvider } from "./context/SnackbarProvider.jsx";

const root = document.getElementById("root");
createRoot(root).render(
  <StrictMode>
    <SnackbarProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </SnackbarProvider>
  </StrictMode>
);
