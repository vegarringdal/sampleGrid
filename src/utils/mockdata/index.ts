// src/mocks/handlers.js
import { setupWorker } from "msw/browser";
import { cableMockData } from "./cableMockData";
import { templateLineMockData } from "./templateLineMockData";
import { templateMockData } from "./templateMockData";
import { equipmentMockData } from "./equipmentMockData";
import { workpackMockData } from "./workpackMockData";

const all = cableMockData
  .generateHandlers()
  .concat(templateLineMockData.generateHandlers())
  .concat(templateMockData.generateHandlers())
  .concat(equipmentMockData.generateHandlers())
  .concat(workpackMockData.generateHandlers());

export const worker = setupWorker(...all);

worker.start({
  serviceWorker: {
    url: location.origin.includes("github")
      ? "/sampleGridInReact/mockServiceWorker.js"
      : "/mockServiceWorker.js",
  },
});
