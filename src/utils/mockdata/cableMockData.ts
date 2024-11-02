// just trying out what we can do
// maybe make a wrapper class later, so its ewasuer to create many

import { http, HttpResponse } from "msw";
import { CableEntity } from "../../data/entities/CableEntity";

type DEFAULT_ENTITY = CableEntity;

class CableMockData {
  cache = new Map<number, DEFAULT_ENTITY>();
  counter = 1;

  constructor() {
    for (let i = 1; i < 9999; i++) {
      this.counter = i;
      const c = this.counter;
      const n = String(c).padStart(4, "0");
      this.cache.set(c, {
        id: c,
        tag: "JSK75FD" + n,
        fromTag: "7589FD" + n,
        areaFrom: "P" + n,
        toTag: "7589JB" + n,
        areaTo: "T" + n,
        const: "EQUINOR",
        design: "HAUHE",
        site: "THAI",
        cableId: "cid" + String(c).padStart(8, "0"),
        cableDesc:
          c % 2 === 0 ? "BFOU(i) - 1x2x0.75mm2" : "BFOU(c) - 2x2x1.50mm2",
        cableType: c % 2 === 0 ? "BFOU(i)" : "BFOU(c)",
        cableTypeDim: c % 2 === 0 ? "1x2x0.75mm2" : "2x2x1.50mm2",
        source: "ES",
        dicipline: "LJ",
        status: "TS",
        partAddressFrom: "A01:X1:245",
        partAddressTo: "B01:X1:245",
        termFrom: "E0785-XA-" + n,
        termTo: "E0775-XA-" + n,
        mc: "M01E" + n,
        com: "C02E" + n,
        op01: "PU:0",
        op02: "TF:0",
        op03: "TT:0",
        op04: "TC:0",
        op05: null,
        op06: null,
        op07: null,
        op08: null,
        op09: null,
        op10: null,
        op11: null,
        op12: null,
        op13: null,
        op14: null,
        extString01: null,
        extString02: null,
        extString03: null,
        extString04: null,
        extString05: null,
        extString06: null,
        extString07: null,
        extString08: null,
        extString09: null,
        extString10: null,
        comment: null,
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
    const reg = "cable";

    const handlers = [
      http.get(`${url}/${reg}/:project`, async ({ params }) => {
        console.log(`Captured a "GET /${reg}/${params.project}" request`);
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

export const cableMockData = new CableMockData();
