import {
  DataContainer,
} from "@simple-html/grid";
import { DummyRows } from "../dummyData";


// not sure if I want to have 1 data container shared or service to update 2 datasources ?
// need to test it out a little before I know for sure.

export const dataContainer = new DataContainer();
dataContainer.setData(DummyRows, true);


