import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { destroyScrollMotion, initScrollMotion } from "./hooks/useScrollMotion";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

let cleanupScrollMotion: (() => void) | undefined;

window.requestAnimationFrame(() => {
  cleanupScrollMotion = initScrollMotion();
});

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    cleanupScrollMotion?.();
    destroyScrollMotion();
  });
}
