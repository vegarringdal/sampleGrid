// src/mocks/handlers.js
import { setupWorker } from "msw/browser";
import { cableMockData } from "./cableMockData";
import { templateLineMockData } from "./templateLineMockData";
import { templateMockData } from "./templateMockData";

export const worker = setupWorker(
  ...cableMockData
    .generateHandlers()
    .concat(templateLineMockData.generateHandlers())
    .concat(templateMockData.generateHandlers())
);
worker.start({
  serviceWorker: {
    url: location.origin.includes("github")
      ? "/sampleGridInReact/mockServiceWorker.js"
      : "/mockServiceWorker.js",
  },
});
