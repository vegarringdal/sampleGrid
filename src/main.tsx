import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "primeicons/primeicons.css";
import { App } from "./App.tsx";
import { twMerge } from "tailwind-merge";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
     <PrimeReactProvider
      value={{
        unstyled: true,
        pt: Tailwind,
        ptOptions: {
          mergeSections: true,
          mergeProps: true,
          classNameMergeFunction: twMerge,
        },
      }}
    >
    <App />
    </PrimeReactProvider>
  </StrictMode>
);
