// just trying out what we can do
// maybe make a wrapper class later, so its ewasuer to create many

import { http, HttpResponse } from "msw";
import { CableEntity } from "../../data/entities/cableEntity";

class CableMockData {
  cache = new Map<number, CableEntity>();
  counter = 1;

  constructor() {
    for (let i = 1; i < 150; i++) {
      this.counter = i;
      const c = this.counter;
      this.cache.set(c, {
        id: c,
        tag: "JSK75FD" + String(c).padStart(4, "0"),
        fromTag: "7589FD" + +String(c).padStart(4, "0"),
        areaFrom: "P" + String(c).padStart(4, "0"),
        toTag: "7589JB" + String(c).padStart(4, "0"),
        areaTo: "T" + String(c).padStart(4, "0"),
        const: "EQUINOR",
        design: "HAUHE",
        site: "THAI",
        cableId: "cid" + String(c).padStart(8, "0"),
        cableDesc: c % 2 === 0 ? "BFOU(i) - 1x2x0.75mm2": "BFOU(c) - 2x2x1.50mm2",
        cableType: c % 2 === 0 ? "BFOU(i)" : "BFOU(c)",
        cableTypeDim: c % 2 === 0 ? "1x2x0.75mm2": "2x2x1.50mm2",
        source: "ES",
        dicipline: "LJ",
        status: "TS",
        partAddressFrom: "A01:X1:245",
        partAddressTo: "B01:X1:245",
        termFrom: "E0785-XA-" + String(c).padStart(4, "0"),
        termTo: "E0775-XA-" + String(c).padStart(4, "0"),
        mc: "M01E" + String(c).padStart(4, "0"),
        com: "C02E" + String(c).padStart(4, "0"),
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

  async reqPost(newData: CableEntity) {
    this.counter += 1;
    this.cache.set(this.counter, newData);

    return this.cache.get(this.counter);
  }

  async reqPut(id: number, newData: CableEntity) {
    // keeping my patch very simple, not using jsonPatch
    const oldData = this.cache.get(id) as CableEntity;
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
    const url = "https://example.com/api/";

    const handlers = [
      http.get(`${url}cables/:project`, async ({ params }) => {
        console.log(`Captured a "GET /cables/${params.project}" request`);
        await that.wait();
        const data = await that.reqGetAll();
        return HttpResponse.json(data, { status: 200 });
      }),
      http.post(`${url}/cable/:project`, async ({ params, request }) => {
        console.log(`Captured a "POST /cable/${params.project}" request`);
        const newData = (await request.json()) as CableEntity;
        const data = await that.reqPost(newData);
        return HttpResponse.json(data, { status: 201 });
      }),
      http.put(`${url}/cable/:project/:id`, async ({ params, request }) => {
        console.log(
          `Captured a "PUT /cable/${params.project}/${params.id}" request`
        );
        const newData = (await request.json()) as CableEntity;
        const data = await that.reqPut(parseInt(params.id as string), newData);
        return HttpResponse.json(data, { status: 201 });
      }),
      http.delete(`${url}/cable/:project/:id`, async ({ params }) => {
        console.log(
          `Captured a "DELETE /cable/${params.project}/${params.id}" request`
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
