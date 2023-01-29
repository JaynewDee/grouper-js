const { round, floor, random } = Math;

const utils = Object.freeze({
  sortDesc: (recs, col) => recs.sort((a, b) => b[col] - a[col]),
  getRandIdx: (arrayLength) => floor(random() * arrayLength),
  calcAvg: (recs, avgCol) =>
    round(recs.reduce((acc, val) => (acc += val[avgCol]), 0) / recs.length)
});

const partition = (sorted, remainder) => {
  const outliers = popOutliers(sorted, remainder);
  const pruned = sorted.filter((student) =>
    student in outliers ? false : true
  );
  return [outliers, pruned];
};

const processRecords = (records, columnName, groupSize) => {
  const { sortDesc, calcAvg } = utils;
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
  const classAvg = calcAvg(records, columnName);
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
    const g = groups[group];
    groupAvgs[group] = round(
      g.reduce((acc, obj) => (acc += obj["avg"]), 0) / g.length
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

  const randomStudent = studentRecords[utils.getRandIdx(studentRecords.length)];
  const keyString = String(currentGroup);
  randomStudent.group = keyString;
  groupsMap[keyString] = [...groupsMap[keyString], randomStudent];

  if (currentGroup === numGroups) currentGroup = 1;
  else currentGroup += 1;

  const filteredRecords = studentRecords.filter((r) => r !== randomStudent);
  return assign(currentGroup, filteredRecords, groupsMap, numGroups);
};

export const assignGroups = (fileHandler) => async (input, options) => {
  const { writeToTemp, paths, parser } = fileHandler(input);
  const { localAbsolute, studentsWritePath, groupsWritePath } = paths;
  const { groupSize } = options;

  const parsed = await parser("bcsGroups")(localAbsolute);
  await writeToTemp(studentsWritePath, parsed);

  const groups = processRecords(parsed, "avg", groupSize);
  await writeToTemp(groupsWritePath, groups);

  Object.values(groups).forEach((g) => console.table(g));
};