// src/mocks/handlers.js
import { setupWorker } from "msw/browser";
import { cableMockData } from "./cable";

export const worker = setupWorker(...cableMockData.generateHandlers());
worker.start({
  serviceWorker: {
    url: location.origin.includes("github")
      ? "/sampleGridInReact/mockServiceWorker.js"
      : "/mockServiceWorker.js",
  },
});
console.log(worker);
