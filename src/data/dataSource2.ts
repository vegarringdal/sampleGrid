import { Datasource } from "@simple-html/grid/dist/datasource/dataSource";
import { DummyData, DummyRows } from "../dummyData";

/**
 * datasource1
 */
export const dataSource2 = new Datasource<DummyData>();
dataSource2.setData(DummyRows);
