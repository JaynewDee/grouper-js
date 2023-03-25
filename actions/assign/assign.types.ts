import { StudentType } from "../../lib/models";

export type RecArray = StudentType[];

export interface UtilsObject {
  sortDesc: (recs: RecArray, col: any) => RecArray;
  getRandIdx: (arrLen: number) => number;
  standardDeviation: (arr: number[], usePop?: boolean) => number;
  cleanRecords: (recs: RecArray) => RecArray;
}

export type GroupsObject = {
  [key: string]: string | number | any;
};
