import { Datasource } from "@simple-html/grid/dist/datasource/dataSource";
import { DummyData, DummyRows } from "../dummyData";

/**
 * datasource1
 */
export const dataSource1 = new Datasource<DummyData>();
dataSource1.setData(DummyRows);
