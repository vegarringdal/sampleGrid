// just trying out what we can do
// maybe make a wrapper class later, so its ewasuer to create many

import { http, HttpResponse } from "msw";
import { TemplateEntity } from "../../data/entities/TemplateEntity";

type DEFAULT_ENTITY = TemplateEntity;

class TemplateMockData {
  cache = new Map<number, DEFAULT_ENTITY>();
  counter = 1;

  constructor() {
    for (let i = 1; i < 100; i++) {
      this.counter = i;
      const c = this.counter;
      const n = String(c).padStart(4, "0");
      this.cache.set(c, {
        id: c,
        desc: "SomeTemplate no:" + n,
        createdBy: "OTGEJSHE",
        modifiedBy: "OTGEJSHE",
        created: new Date(),
        modified: new Date(),
      });
    }
  }

  async wait(ms = 1000): Promise<void> {
    return new Promise((r) => {
      setTimeout(() => {
        r();
      }, ms);
    });
  }

  async reqGetAll() {
    return Array.from(this.cache).map((v) => v[1]);
  }

  async reqPost(newData: DEFAULT_ENTITY) {
    this.counter += 1;
    this.cache.set(this.counter, newData);

    return this.cache.get(this.counter);
  }

  async reqPut(id: number, newData: DEFAULT_ENTITY) {
    // keeping my patch very simple, not using jsonPatch
    const oldData = this.cache.get(id) as DEFAULT_ENTITY;
    this.cache.set(id, Object.assign(oldData, newData));
    return this.cache.get(id);
  }

  async reqDelete(id: number) {
    this.cache.delete(id);

    return this.cache.get(id);
  }

  generateHandlers() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    const url = "https://example.com/api";
    const reg = "cable";

    const handlers = [
      http.get(`${url}/${reg}/:project`, async ({ params }) => {
        console.log(`Captured a "GET /cables/${params.project}" request`);
        await that.wait();
        const data = await that.reqGetAll();
        return HttpResponse.json(data, { status: 200 });
      }),
      http.post(`${url}/${reg}/:project`, async ({ params, request }) => {
        console.log(`Captured a "POST /${reg}/${params.project}" request`);
        const newData = (await request.json()) as DEFAULT_ENTITY;
        const data = await that.reqPost(newData);
        return HttpResponse.json(data, { status: 201 });
      }),
      http.put(`${url}/${reg}/:project/:id`, async ({ params, request }) => {
        console.log(
          `Captured a "PUT /${reg}/${params.project}/${params.id}" request`,
        );
        const newData = (await request.json()) as DEFAULT_ENTITY;
        const data = await that.reqPut(parseInt(params.id as string), newData);
        return HttpResponse.json(data, { status: 201 });
      }),
      http.delete(`${url}/${reg}/:project/:id`, async ({ params }) => {
        console.log(
          `Captured a "DELETE /${reg}/${params.project}/${params.id}" request`,
        );
        const data = await that.reqDelete(parseInt(params.id as string));
        return HttpResponse.json(data, {
          status: 200,
        });
      }),
    ];

    return handlers;
  }
}

export const templateMockData = new TemplateMockData();
