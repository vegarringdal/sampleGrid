import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./utils/mockdata/index.ts";
import "./index.css";
import "primeicons/primeicons.css";
import { App } from "./App";
import { PrimeReactProvider } from "primereact/api";
import { twMerge } from "tailwind-merge";
import { LoadingDialog } from "./components/common/LoadingDialog";
import { ErrorDialog } from "./components/common/ErrorDialog";

// added manually for better conftrol
// import Tailwind from "primereact/passthrough/tailwind";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TailwindOverride from "./utils/style/TailwindOverride.ts";
import { ImportDialog } from "./components/common/importDialog/ImportDialog";

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
      <LoadingDialog />
      <ErrorDialog />
      <ImportDialog />
      <App />
    </PrimeReactProvider>
  </StrictMode>,
);
