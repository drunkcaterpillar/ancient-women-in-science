// src/index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ModalProvider } from "/home/shon/Desktop/women-in-stem-globe/src/context/ModalContext";
import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>
);

reportWebVitals();
