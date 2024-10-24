import { create } from "zustand";
import {
  dateType,
  getDateFormat,
  getNumberFormat,
  numberType,
} from "../data/common/numberAndDateFormat";

type setDateAndNumberStore = {
  date: dateType;
  number: numberType;
  setDateType: (value: dateType) => void;
  setNumberType: (value: numberType) => void;
};

/**
 * dateformat store, helper for setting format used for numbers and date
 * this is a datestore only to help update gui incase you need to use formating anywhere else expects datagrid
 */
export const dateAndNumberStore = create<setDateAndNumberStore>((set) => ({
  date: getDateFormat(),
  number: getNumberFormat(),
  setDateType: (value: dateType) => {
    window.localStorage.setItem("APP-DATE-FORMAT", value);
    set(() => ({ date: value }));
  },
  setNumberType: (value: numberType) => {
    window.localStorage.setItem("APP-NUMBER-FORMAT", value);
    set(() => ({ number: value }));
  },
}));
