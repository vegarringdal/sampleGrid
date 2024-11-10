// just trying out what we can do
// maybe make a wrapper class later, so its ewasuer to create many

import { http, HttpResponse } from "msw";
import { TemplateLineEntity } from "../../data/entities/TemplateLineEntity";

type DEFAULT_ENTITY = TemplateLineEntity;

class TemplateLineMockData {
  cache = new Map<number, DEFAULT_ENTITY>();
  counter = 1;

  constructor() {
    for (let i = 1; i < 400; i += 1) {
      this.counter = i * 4;
      const c = this.counter;

      const x = Math.floor(Math.random() * 999);
      const y = Math.floor(Math.random() * 9554);

      this.cache.set(c, {
        id: c,
        templateID: i, //parent ref
        opNo: 1,
        op: "PU",
        compcode: `E21.${String(x).padStart(3, "0")}.${String(y + 1).padStart(3, "0")}`,
        compDesc: "Pull cable BFOU(c) 1x2X0.75mm",
        factor: "F1",
        task: null,
        workpack: null,
        quantity: null,
        createdBy: "OTGEJSHE",
        modifiedBy: "OTGEJSHE",
        created: new Date(),
        modified: new Date(),
        isDeleted: false,
        lastModified: new Date(),
      });
      this.cache.set(c + 1, {
        id: c + 1,
        templateID: i, //parent ref
        opNo: 2,
        op: "TF",
        compcode: `E21.${String(x).padStart(3, "0")}.${String(y + 3).padStart(3, "0")}`,
        compDesc: "Term cable BFOU(c) 1x2X0.75mm",
        factor: "F1",
        task: null,
        workpack: null,
        quantity: null,
        createdBy: "OTGEJSHE",
        modifiedBy: "OTGEJSHE",
        created: new Date(),
        modified: new Date(),
        isDeleted: false,
        lastModified: new Date(),
      });
      this.cache.set(c + 2, {
        id: c + 2,
        templateID: i, //parent ref
        opNo: 3,
        op: "TT",
        compcode: `E21.${String(x).padStart(3, "0")}.${String(y + 3).padStart(3, "0")}`,
        compDesc: "Term cable BFOU(c) 1x2X0.75mm",
        factor: "TT",
        task: null,
        workpack: null,
        quantity: null,
        createdBy: "OTGEJSHE",
        modifiedBy: "OTGEJSHE",
        created: new Date(),
        modified: new Date(),
        isDeleted: false,
        lastModified: new Date(),
      });
      this.cache.set(c + 3, {
        id: c + 3,
        templateID: i, //parent ref
        opNo: 4,
        op: "TC",
        compcode: `E21.${String(x).padStart(3, "0")}.${String(y + 4).padStart(3, "0")}`,
        compDesc: "Test cable BFOU(c) 1x2X0.75mm",
        factor: "F1",
        task: null,
        workpack: null,
        quantity: null,
        createdBy: "OTGEJSHE",
        modifiedBy: "OTGEJSHE",
        created: new Date(),
        modified: new Date(),
        isDeleted: false,
        lastModified: new Date(),
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
    const reg = "templateline";

    const handlers = [
      http.get(`${url}/${reg}/:project`, async ({ params }) => {
        console.log(`Captured a "GET  /${reg}/${params.project}" request`);
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
          `Captured a "PUT /${reg}/${params.project}/${params.id}" request`
        );
        const newData = (await request.json()) as DEFAULT_ENTITY;
        const data = await that.reqPut(parseInt(params.id as string), newData);
        return HttpResponse.json(data, { status: 201 });
      }),
      http.delete(`${url}/${reg}/:project/:id`, async ({ params }) => {
        console.log(
          `Captured a "DELETE /${reg}/${params.project}/${params.id}" request`
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

export const templateLineMockData = new TemplateLineMockData();
