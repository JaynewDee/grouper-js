export type Records = any;

export interface UtilsObject {
  sortDesc: (recs: Records, col: any) => Records;
  getRandIdx: (arrLen: number) => number;
  standardDeviation: (arr: number[], usePop?: boolean) => number;
  cleanRecords: (recs: Records) => Records;
}
