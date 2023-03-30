import ora from "ora";
import { TitleDecor } from "../../lib/decor.js";
import { FHType, Input } from "../../lib/fs.js";
import { StudentType } from "../../lib/models.js";
import { BalancerPool } from "./pool.js";
import { exportHandler } from "../export.js";

import { RecArray, UtilsObject, GroupsObject } from "./assign.types.js";

const { round, floor, random, sqrt } = Math;

export const utils: UtilsObject = {
  sortDesc: (recs, col) => recs.sort((a: any, b: any) => b[col] - a[col]),
  getRandIdx: (arrayLength: number) => floor(random() * arrayLength),
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

export function balance(
  groups: RecArray,
  targetSD = 1,
  iterations = 0,
  outliers: any[]
): StudentType[] {
  const groupAvgs = calcGroupAvgs(groups);

  const targetGroups = findTargetGroup(groupAvgs, outliers.length, []);

  const preFinal = assignOutliers(groups, outliers, targetGroups);

  const avgs = calcGroupAvgs(preFinal);

  console.log(avgs);
  const SD = utils.standardDeviation(Object.values(avgs));
  console.log(SD);

  if (SD > targetSD) {
    if (iterations < 2000) {
      return balance(
        groups.sort(() => Math.random() - 0.5),
        targetSD,
        iterations + 1,
        outliers
      );
    } else {
      iterations = 0;
      return balance(
        groups.sort(() => Math.random() - 0.5),
        targetSD + 1,
        iterations,
        outliers
      );
    }
  }
  console.log(`Standard Deviation: ${SD.toFixed(2)}`);
  return preFinal;
}

export function partition(sorted: StudentType[], remainder: number) {
  const outliers = popOutliers(sorted, remainder);
  const pruned = sorted.filter((student: any) =>
    student in outliers ? false : true
  );

  return [outliers, pruned];
}

export function processRecords(
  records: RecArray,
  columnName: string,
  groupSize: number
) {
  const numStudents = records.length;
  const numGroups = floor(numStudents / groupSize);
  const remainder = numStudents % groupSize;

  const sorted = utils.sortDesc([...records], columnName);
  const [outliers, pruned] = partition([...sorted], remainder);

  const groupsMap = setupGroupsObject(numGroups, "array");
  const groups = assign(1, pruned, groupsMap, numGroups);
  // RECURSE
  const finalized = balance(groups, numGroups, remainder, outliers);

  return finalized;
}

export function assignOutliers(
  groups: any[],
  outliers: any,
  targets: string[]
) {
  targets.forEach((groupNum: any, idx: number) => {
    outliers[idx].group = groupNum;
    groups[groupNum]?.push(outliers[idx]);
  });
  return groups;
}

export function findTargetGroup(
  avgs: GroupsObject,
  numOutliers: number,
  targets: string[]
): string[] {
  if (targets.length === numOutliers) return targets;
  const high = Object.values(avgs).reduce((a, b) => (a > b ? a : b));

  // Could be optimized from O(n) to O(1) with appropriately formatted lookup table
  for (const group in avgs) {
    if (avgs[group] === high) {
      targets.push(group);
      delete avgs[group];
      break;
    }
  }
  // RECURSE
  return findTargetGroup(avgs, numOutliers, targets);
}

export const popOutliers = (sorted: StudentType[], remainder: number) => {
  const outliers = [];
  let i = 0;
  while (i < remainder) {
    outliers.push(sorted.pop());
    i++;
  }
  return outliers;
};

export const calcGroupAvgs = (groups: GroupsObject) => {
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

export const setupGroupsObject = (
  numGroups: number,
  type?: string
): GroupsObject => {
  const groupsNumbered: { [key: string]: StudentType[] | number } = {};
  const fillValue = type === "array" ? [] : 0;

  let i = 1;
  while (i <= numGroups) {
    groupsNumbered[i] = fillValue;
    i++;
  }
  return groupsNumbered;
};

export function assign(
  current: number,
  studentRecords: StudentType[] | any,
  groupsMap: GroupsObject | any,
  numGroups: number
): StudentType[] {
  if (!studentRecords?.length) return groupsMap;
  let currentGroup = current;

  const randomStudent = studentRecords[utils.getRandIdx(studentRecords.length)];
  const keyString = String(currentGroup);
  randomStudent.group = keyString;
  groupsMap[keyString] = [...groupsMap[keyString], randomStudent];

  if (currentGroup === numGroups) currentGroup = 1;
  else currentGroup += 1;

  const filteredRecords = studentRecords.filter(
    (r: StudentType) => r !== randomStudent
  );

  // RECURSE
  return assign(currentGroup, filteredRecords, groupsMap, numGroups);
}

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
  (fileHandler: FHType) =>
  async (input: Input, options: { [key: string]: string }) => {
    console.log(TitleDecor("CSV will be written to current path"));

    const { writeToTemp, paths, parser, clearStorage } = fileHandler(input);

    const gs = parseInt(options.groupSize);
    const { localAbsolute, studentsWritePath, groupsWritePath } = paths;

    const parsed: any = await parser("bcsGroups", [])(localAbsolute);

    await writeToTemp(studentsWritePath, parsed);
    const groups = processRecords(utils.cleanRecords(parsed), "avg", gs);
    await writeToTemp(groupsWritePath, groups);

    await useDelivery(groups);
    await exportHandler(fileHandler)({
      fileType: ".csv",
      collectionType: "groups"
    });

    clearStorage(groupsWritePath);
  };
