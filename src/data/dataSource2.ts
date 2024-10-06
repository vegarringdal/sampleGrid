import { Datasource } from "@simple-html/grid/dist/datasource/dataSource";
import { DummyData } from "../dummyData";
import { dataContainer } from "./dataController";

/**
 * datasource1
 */
export const dataSource2 = new Datasource<DummyData>(dataContainer);

