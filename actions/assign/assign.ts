import ora from "ora";
import { TitleDecor } from "../../lib/decor.js";
import { FHType, Input } from "../../lib/fs.js";
import { StudentType } from "../../lib/models.js";
import { exportHandler } from "../export.js";
const { round, floor, random, sqrt } = Math;

import { Records, UtilsObject } from "./assign.types.js";

export const utils: UtilsObject = {
  sortDesc: (recs, col) => recs.sort((a: any, b: any) => b[col] - a[col]),
  getRandIdx: (arrayLength) => floor(random() * arrayLength),
  standardDeviation: (arr, usePopulation = false) => {
    const mean: number = arr.reduce((acc, val) => acc + val, 0) / arr.length;
    return sqrt(
      arr
        .reduce(
          (acc: number[], val: number) => acc.concat((val - mean) ** 2),
          []
        )
        .reduce((acc, val) => acc + val, 0) /
        (arr.length - (usePopulation ? 0 : 1))
    );
  },
  cleanRecords: (records) => records.filter((rec: StudentType) => rec.avg !== 0)
};

const { sortDesc, getRandIdx, standardDeviation, cleanRecords } = utils;

export const balance = (
  records: Records,
  columnName: string,
  numGroups: number,
  remainder: number,
  targetSD = 1,
  iterations = 0
): StudentType[] => {
  const copy = records.slice();
  const sorted = sortDesc(copy, columnName);
  const [outliers, pruned] = partition(sorted, remainder);

  const groupsMap = setupGroupsObject(numGroups, "array");
  const groups = assign(1, pruned, groupsMap, numGroups);
  const groupAvgs = calcGroupAvgs(groups);
  const targetGroups = findTargetGroup(groupAvgs, outliers.length, []);
  const preFinal = assignOutliers(groups, outliers, targetGroups);

  const avgs = calcGroupAvgs(preFinal);
  const SD = standardDeviation(Object.values(avgs));

  if (SD > targetSD) {
    if (iterations < 500) {
      return balance(
        records,
        columnName,
        numGroups,
        remainder,
        targetSD,
        iterations + 1
      );
    } else {
      iterations = 0;
      return balance(
        records,
        columnName,
        numGroups,
        remainder,
        targetSD + 1,
        iterations
      );
    }
  }
  return preFinal;
};

export const partition = (sorted: StudentType[], remainder: number) => {
  const outliers = popOutliers(sorted, remainder);
  const pruned = sorted.filter((student: any) =>
    student in outliers ? false : true
  );
  return [outliers, pruned];
};

export const processRecords = (
  records: Records,
  columnName: string,
  groupSize: number
) => {
  const numStudents = records.length;
  const numGroups = floor(numStudents / groupSize);
  const remainder = numStudents % groupSize;
  const finalized = balance(records, columnName, numGroups, remainder);

  return finalized;
};

export const assignOutliers = (
  groups: any[],
  outliers: any,
  targets: StudentType[]
) => {
  targets.forEach((groupNum: any, idx: number) => {
    groups[groupNum]?.push(outliers[idx]);
  });
  return groups;
};

export const findTargetGroup = (
  avgs: any[],
  numOutliers: number,
  targets: any
): StudentType[] => {
  if (targets.length === numOutliers) return targets;

  const high = Object.values(avgs).reduce((a, b) => (a > b ? a : b));

  targets.push(high);

  if (high in avgs) delete avgs[high[0]];

  return findTargetGroup(avgs, numOutliers, targets);
};

export const popOutliers = (sorted: StudentType[], remainder: number) => {
  const outliers = [];
  let i = 0;
  while (i < remainder) {
    outliers.push(sorted.pop());
    i++;
  }
  return outliers;
};

export const calcGroupAvgs = (groups: any) => {
  const groupAvgs = setupGroupsObject(Object.keys(groups).length);
  for (const group in groups) {
    const g = groups[group];
    groupAvgs[group] = round(
      g.reduce((acc: number, obj: StudentType) => (acc += obj["avg"]), 0) /
        g.length
    );
  }
  return groupAvgs;
};

export const setupGroupsObject = (numGroups: number, type?: string): any => {
  const groupsNumbered: any = {};
  const fillValue = type === "array" ? [] : 0;

  let i = 1;
  while (i <= numGroups) {
    groupsNumbered[i] = fillValue;
    i++;
  }
  return groupsNumbered;
};

export const assign = (
  current: number,
  studentRecords: any,
  groupsMap: any,
  numGroups: number
): StudentType[] => {
  if (!studentRecords?.length) return groupsMap;
  let currentGroup = current;

  const randomStudent = studentRecords[getRandIdx(studentRecords.length)];
  const keyString = String(currentGroup);
  randomStudent.group = keyString;
  groupsMap[keyString] = [...groupsMap[keyString], randomStudent];

  if (currentGroup === numGroups) currentGroup = 1;
  else currentGroup += 1;

  const filteredRecords = studentRecords.filter(
    (r: any) => r !== randomStudent
  );
  return assign(currentGroup, filteredRecords, groupsMap, numGroups);
};

const useDelivery = async (data: StudentType[]) => {
  const spinner = ora("Processing").start();

  let interval = 300;
  setTimeout(() => {
    spinner.stop();
  }, 1000);
  setTimeout(() => {
    Object.values(data).forEach((g) => {
      setTimeout(() => {
        console.table(g);
      }, (interval += 300));
    });
  }, 1000);
};

export const assignGroups =
  (fileHandler: FHType) => async (input: Input, options: any) => {
    console.log(TitleDecor("CSV will be written to current path"));
    const { writeToTemp, paths, parser } = fileHandler(input);
    const { groupSize } = options;
    const { localAbsolute, studentsWritePath, groupsWritePath } = paths;

    const parsed: any = await parser("bcsGroups", [])(localAbsolute);

    await writeToTemp(studentsWritePath, parsed);
    const groups = processRecords(cleanRecords(parsed), "avg", groupSize);
    await writeToTemp(groupsWritePath, groups);

    await useDelivery(groups);
    await exportHandler(fileHandler)({
      fileType: ".csv",
      collectionType: "groups"
    });
  };
