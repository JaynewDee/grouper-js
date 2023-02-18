import { StudentType } from "../../lib/models";

export type Records = any;
type RecArray = StudentType[];

export interface UtilsObject {
  sortDesc: (recs: Records, col: any) => Records;
  getRandIdx: (arrLen: number) => number;
  standardDeviation: (arr: number[], usePop?: boolean) => number;
  cleanRecords: (recs: RecArray) => RecArray;
}
