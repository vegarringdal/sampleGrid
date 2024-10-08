import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "primeicons/primeicons.css";
import { App } from "./App.tsx";
import { PrimeReactProvider } from "primereact/api";

// need to wait for next version to enable, but in tabview

import { twMerge } from "tailwind-merge";
import Tailwind from "primereact/passthrough/tailwind";
import TailwindOverride from "./TailwindOverride.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
     <PrimeReactProvider
      value={{
        unstyled: true,
        pt: TailwindOverride as unknown as never,
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



