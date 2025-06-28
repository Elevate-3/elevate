import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Auth from "./Auth";
import { Button } from "./components/ui/button";

const container = document.getElementById("root");
if (!container) throw new Error("Root container missing in index.html");

createRoot(container).render(
  <StrictMode>
    <App />
    <Auth />
    <Button
      onClick={() => {
        console.log("clicked");
      }}
    >
      Click me
    </Button>
  </StrictMode>
);
