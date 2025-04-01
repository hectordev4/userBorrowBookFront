import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App";
import { AppServicesProvider } from "./middleware/appServicesContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppServicesProvider>
      <App />
    </AppServicesProvider>
  </StrictMode>
);
