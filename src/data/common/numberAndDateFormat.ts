import {
  DateFormaterYYYYMMDD,
  NumberFormaterComma,
  NumberFormaterDot,
  DateFormaterDDMMYYYY,
  DateFormaterDDMMYYYYTHHMMSS,
  DateFormaterYYYYMMDDTHHMMSS,
} from "@simple-html/grid";
import { gridControllers } from "../gridControllers";
import {
  getFilterPlaceholder,
  getRowPlaceholder,
} from "./GridController";


////////////////////////////////////////////////////////////////
// This file commen utils for handling date 
// and number format used by grid
///////////////////////////////////////////////////////////////


export type numberType = "DOT" | "COMMA";
export type dateType =
  | "YYYYMMDD"
  | "DDMMYYYY"
  | "YYYYMMDDTHHMMSS"
  | "DDMMYYYYTHHMMSS";

export function getDateFormat() {
  return (window.localStorage.getItem("APP-DATE-FORMAT") || "YYYYMMDD") as dateType;
}

export function getDateFormater() {
  const state = getDateFormat();

  if (state === "YYYYMMDD") {
    return DateFormaterYYYYMMDD;
  }

  if (state === "DDMMYYYY") {
    return DateFormaterDDMMYYYY;
  }

  if (state === "DDMMYYYYTHHMMSS") {
    return DateFormaterDDMMYYYYTHHMMSS;
  }

  if (state === "YYYYMMDDTHHMMSS") {
    return DateFormaterYYYYMMDDTHHMMSS;
  }

  throw "something is wrong with date format:" + state;
}

export function getNumberFormat() {
  return (window.localStorage.getItem("APP-NUMBER-FORMAT") || "DOT") as numberType;
}

export function getNumberFormater() {
  const state = getNumberFormat();

  if (state === "DOT") {
    return NumberFormaterDot;
  }

  if (state === "COMMA") {
    return NumberFormaterComma;
  }

  throw "something is wrong with number format";
}

/**
 * updates all datasources
 */
export function updateAllGridControllers() {
  const sourceKeys = Object.keys(gridControllers)  ;

  sourceKeys.forEach((k) => {
    const gridController = gridControllers[k as keyof typeof gridControllers];
    
    const datasource = gridController.getGridDatasource();
    const gridInterface = gridController.getGridInterface();
    
    datasource.setDateFormater(getDateFormater());
    datasource.setNumberFormater(getNumberFormater());
    
    /* store.gridInterface.triggerScrollEvent(); */
    
    const config = gridInterface.saveConfig();
    config.attributes.forEach((att) => {
      // 
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
