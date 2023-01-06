import csv from "csvtojson";
import { parse } from "json2csv";
import { Student } from "./models.js";
const { round, floor } = Math;

const { name, avg, group } = Object.freeze({
  name: new RegExp(/name|studentname/i),
  avg: new RegExp(/avg|average|gpa/i),
  group: new RegExp(/group|team|/i)
});

const getFields = (studentsArr) =>
  studentsArr.map((studentObj) =>
    Object.entries(studentObj).reduce(
      (acc, [key, val]) =>
        key.match(name)
          ? { ...acc, name: val }
          : key.match(avg)
          ? { ...acc, avg: parseInt(val) }
          : key.match(group)
          ? { ...acc, group: val }
          : acc,
      {}
    )
  );

const readCsv = async (absPath) => await csv().fromFile(absPath);

const convertFormattedCsvToJson = async (absPath) =>
  readCsv(absPath)
    .then((jsonArr) => getFields(jsonArr))
    .catch((err) => console.error(err));

const convertFormattedJsonToCsv = (jsonData) => parse(jsonData);

const convertGroupsJsonToCsv = (jsonData) =>
  parse(jsonData, { fields: ["name", "avg", "group"] });

/**
 * @constructor
 * @returns {object}
 */
export const FileParser =
  (type = "", data = []) =>
  async (path = "") => {
    switch (type) {
      case "formattedCsv":
        return convertFormattedCsvToJson(path);
      case "formattedJson":
        return convertFormattedJsonToCsv(data);
      case "groupsJson":
        return convertGroupsJsonToCsv(data);
      case "":
        throw new Error("Mandatory argument 'type' not provided ... ");
      default:
        throw new Error("What have you done ... ");
    }
  };

const bcsToUsable = async (path) =>
  await readCsv(path).then((messy) =>
    messy
      .map((val) => Student(val["Student"], val["Current Score"], 0))
      .filter(
        (obj) => obj.name !== "Points Possible" && obj.name !== "Student, Test"
      )
      .sort((a, b) => (a.avg > b.avg ? 1 : -1))
  );

const calcClassAvg = (students) =>
  students.reduce((acc, val) => (acc += val.avg), 0);

const importBcs = async (path) => {
  const students = await bcsToUsable(path);
  const classAvg = round(calcClassAvg(students) / students.length);
  console.log(classAvg);
};

const sortDesc = (recs, col) => recs.sort((a, b) => b[col] - a[col]);
const getRandIdx = (arrayLength) => floor(random() * arrayLength);
const calcAvg = (recs, avgCol) =>
  round(recs.reduce((acc, val) => (acc += val[avgCol]), 0) / recs.length);

const partition = (sorted, remainder) => {
  const outliers = popOutliers(sorted, remainder);
  const pruned = sorted.filter((student) =>
    student in outliers ? false : true
  );
  return [outliers, pruned];
};

const processRecords = (records, columnName, groupSize) => {
  const classAvg = calcAvg(records, columnName);
  console.log(classAvg);
  const numStudents = records.length;
  const numGroups = floor(numStudents / groupSize);
  const remainder = numStudents % groupSize;
  const sorted = sortDesc(records, columnName);
  const [outliers, pruned] = partition(sorted, remainder);
  const groupsMap = setupGroupsObject(numGroups, "array");
  const groups = assign(1, pruned, groupsMap, numGroups);
  const groupAvgs = calcGroupAvgs(groups);
  const targetGroups = findTargetGroup(groupAvgs, outliers.length, []);
  const finalized = assignOutliers(groups, outliers, targetGroups);
  const avgs = calcGroupAvgs(finalized);
  console.log(avgs);
  return finalized;
};

const assignOutliers = (groups, outliers, targets) => {
  targets.forEach((groupNum, idx) => {
    groups[groupNum].push(outliers[idx]);
  });
  return groups;
};

const findTargetGroup = (avgs, numOutliers, targets) => {
  if (targets.length === numOutliers) return targets;

  const high = Object.keys(avgs).reduce((a, b) => (avgs[a] > avgs[b] ? a : b));

  targets.push(high);

  if (high in avgs) delete avgs[high[0]];

  return findTargetGroup(avgs, numOutliers, targets);
};

const popOutliers = (sorted, remainder) => {
  const outliers = [];
  let i = 0;
  while (i < remainder) {
    outliers.push(sorted.pop());
    i++;
  }
  return outliers;
};

const calcGroupAvgs = (groups) => {
  const groupAvgs = setupGroupsObject(Object.keys(groups).length);
  for (const group in groups) {
    groupAvgs[group] = round(
      groups[group].reduce((acc, obj) => (acc += obj["avg"]), 0) /
        groups[group].length
    );
  }
  return groupAvgs;
};

const setupGroupsObject = (numGroups, type) => {
  const groupsNumbered = {};
  const fillValue = type === "array" ? [] : 0;

  let i = 1;
  while (i <= numGroups) {
    groupsNumbered[i] = fillValue;
    i++;
  }
  return groupsNumbered;
};

const assign = (current, studentRecords, groupsMap, numGroups) => {
  if (!studentRecords.length) return groupsMap;
  let currentGroup = current;

  const randomStudent = studentRecords[getRandIdx(studentRecords.length)];
  const keyString = String(currentGroup);
  groupsMap[keyString] = [...groupsMap[keyString], randomStudent];

  if (currentGroup === numGroups) currentGroup = 1;
  else currentGroup += 1;

  const filteredRecords = studentRecords.filter((r) => r !== randomStudent);
  return assign(currentGroup, filteredRecords, groupsMap, numGroups);
};

export const assignGroups = (fileHandler) => async (input) => {
  const { readFlowJson, paths } = fileHandler();
  const { studentsWritePath } = paths;
  const students = await JSON.parse(readFlowJson(studentsWritePath));
  const groups = processRecords(students, "avg", 4);
  console.log(groups);
};
