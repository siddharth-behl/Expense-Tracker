import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import EditingContext from "./Contexts/EditingContext.jsx"
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <EditingContext>
      <App />
    </EditingContext>
  // </StrictMode>
);
