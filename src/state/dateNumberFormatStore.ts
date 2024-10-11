import { create } from "zustand";
import {
  DateFormaterYYYYMMDD,
  NumberFormaterComma,
  NumberFormaterDot,
  DateFormaterDDMMYYYY,
  DateFormaterDDMMYYYYTHHMMSS,
  DateFormaterYYYYMMDDTHHMMSS,
} from "@simple-html/grid";
import { sources } from "../data/sources";
import {
  DataController,
  getFilterPlaceholder,
  getRowPlaceholder,
} from "../utils/DataController";

type numberType = "DOT" | "COMMA";
type dateType = "YYYYMMDD" | "DDMMYYYY" | "YYYYMMDDTHHMMSS" | "DDMMYYYYTHHMMSS";
type setDateAndNumberStore = {
  date: dateType;
  number: numberType;
  setDateType: (value: dateType) => void;
  setNumberType: (value: numberType) => void;
};

const dateFormat = window.localStorage.getItem("APP-DATE-FORMAT") as
  | dateType
  | undefined;
const numberFormat = window.localStorage.getItem("APP-NUMBER-FORMAT") as
  | numberType
  | undefined;

/**
 * dateformat store, helper for setting format used for numbers and date
 * this is a datestore only to help update gui incase you need to use formating anywhere else expects datagrid
 */
export const dateAndNumberStore = create<setDateAndNumberStore>((set) => ({
  date: dateFormat || "YYYYMMDD",
  number: numberFormat || "DOT",
  setDateType: (value: dateType) => {
    window.localStorage.setItem("APP-ATE-FORMAT", value);
    set(() => ({ date: value }));
  },
  setNumberType: (value: numberType) => {
    window.localStorage.setItem("APP-NUMBER-FORMAT", value);
    set(() => ({ number: value }));
  },
}));

/**
 * returns current date formater
 * @returns
 */
export function getDateFormater() {
  const state = dateAndNumberStore.getState();

  if (state.date === "YYYYMMDD") {
    return DateFormaterYYYYMMDD;
  }

  if (state.date === "DDMMYYYY") {
    return DateFormaterDDMMYYYY;
  }

  if (state.date === "DDMMYYYYTHHMMSS") {
    return DateFormaterDDMMYYYYTHHMMSS;
  }

  if (state.date === "YYYYMMDDTHHMMSS") {
    return DateFormaterYYYYMMDDTHHMMSS;
  }

  throw "something is wrong with date format:" + state.date;
}

/**
 * returns current number formater
 * @returns
 */
export function getNumberFormater() {
  const state = dateAndNumberStore.getState();

  if (state.number === "DOT") {
    return NumberFormaterDot;
  }

  if (state.number === "COMMA") {
    return NumberFormaterComma;
  }

  throw "something is wrong with number format";
}

/**
 * updates all datasources
 */
export function updateAllDataControllers() {
  const sourceKeys = Object.keys(sources);

  sourceKeys.forEach((k) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const dataController: DataController<unknown> = sources[k];
    const datasource = dataController.getGridDatasource();
    const gridInterface = dataController.getGridInterface();
    datasource.setDateFormater(getDateFormater());
    datasource.setNumberFormater(getNumberFormater());
    /* store.gridInterface.triggerScrollEvent(); */
    const config = gridInterface.saveConfig();
    config.attributes.forEach((att) => {
      // update placeholder values
      att.placeHolderFilter = getFilterPlaceholder(
        att.type,
        att.operator || null
      );
      att.placeHolderRow = getRowPlaceholder(
        att.type,
        att.label || att.attribute
      );
    });
    gridInterface.loadConfig(config);
  });
}
