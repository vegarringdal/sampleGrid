// src/mocks/handlers.js
import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import {
  CableEntity,
  getCables,
  newCable,
  updateCable,
} from "./dummyGenerator/cable";

export const handlers = [
  http.get("https://example.com/api/cables/:project", ({ params }) => {
    console.log(`Captured a "GET /cables/${params.project}" request`);
    return HttpResponse.json(getCables(), { status: 200 });
  }),
  http.post(
    "https://example.com/api/cable/:project",
    async ({ params, request }) => {
      console.log(`Captured a "POST /cable/${params.project}" request`);
      const newData = (await request.json()) as CableEntity;
      return HttpResponse.json(newCable(newData), { status: 201 });
    }
  ),
  http.put(
    "https://example.com/api/cable/:project/:id",
    async ({ params, request }) => {
      console.log(
        `Captured a "PUT /cable/${params.project}/${params.id}" request`
      );
      const newData = (await request.json()) as CableEntity;
      return HttpResponse.json(
        updateCable(parseInt(params.id as string), newData),
        { status: 201 }
      );
    }
  ),
  http.delete("https://example.com/api/cable/:project/:id", ({ params }) => {
    console.log(
      `Captured a "DELETE /cable/${params.project}/${params.id}" request`
    );
    return HttpResponse.json({}, { status: 200 });
  }),
];

export const worker = setupWorker(...handlers);
worker.start({
  serviceWorker: {
    url: location.origin.includes("github")
      ? "/sampleGridInReact/mockServiceWorker.js"
      : "/mockServiceWorker.js",
  },
});
console.log(worker);
