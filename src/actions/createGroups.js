// This file contains the logic for creating groups based on student averages

const getRandomIdx = (objSize) => Math.floor(Math.random() * objSize);

const handleUnassignedStudents = (
  unassignedStudents,
  map,
  groupSize,
  numGroups
) => {
  let groups = {};
  for (let i = 1; i <= numGroups; i++) {
    groups[`group_${i}`] = Object.values(map)
      .flat()
      .filter((student) => student['group'] === i);
  }
  let unfinishedGroups = Object.values(groups).filter(
    (group) => group.length < groupSize
  );

  if (!unassignedStudents.length && !unfinishedGroups.length) {
    console.log('All students assigned to groups!');
    return groups;
  }

  while (unassignedStudents.length) {
    if (unfinishedGroups.length) {
      unfinishedGroups.forEach((group) => {
        if (unassignedStudents.length) {
          unassignedStudents[unassignedStudents.length - 1]['group'] =
            group[0]?.['group'];
          group.push(unassignedStudents.pop());
        }
      });
      unfinishedGroups = unfinishedGroups.filter(
        (group) => group.length < groupSize
      );
    } else {
      let randomGroupIdx = getRandomIdx(Object.values(groups).length);
      let randomGroup = Object.values(groups)[randomGroupIdx];
      unassignedStudents[unassignedStudents.length - 1]['group'] =
        randomGroup[0]?.['group'];
      randomGroup.push(unassignedStudents.pop());
    }
  }
  console.log('All students assigned to groups!');
  return groups;
};

const createGroups = (map, numGroups) => {
  let groupSize = Math.floor(
    Object.values(map)
      .flat()
      .map((item) => item).length / numGroups
  );
  let i = 1;
  while (i <= numGroups) {
    Object.values(map).forEach((value) => {
      if (value.filter((v) => !v['group']).length) {
        let randomIdx = getRandomIdx(value.length);
        let randomStudent = value[randomIdx];
        randomStudent['group'] = i;
      }
    });
    i++;
  }

  let unassignedStudents = [];
  Object.values(map).forEach((value) => {
    let groupUnassigned = value.filter((v) => !v['group']);
    unassignedStudents = [...unassignedStudents, ...groupUnassigned];
  });
  return handleUnassignedStudents(
    unassignedStudents,
    map,
    groupSize,
    numGroups
  );
};

const sortByAverages = (records, numGroups) => {
  const students = JSON.parse(records);
  let classMap = {
    above: [],
    below: [],
    outliersBelow: [],
    outliersAbove: [],
  };
  let classAvg =
    students.map((r) => parseInt(r['avg'])).reduce((a, b) => a + b) /
    students.length;

  students.forEach((r) => {
    let avg = parseInt(r['avg']);
    if (avg < 70) classMap.outliersBelow.push(r);
    else if (avg > 90) classMap.outliersAbove.push(r);
    else if (avg < classAvg) classMap.below.push(r);
    else if (avg >= classAvg) classMap.above.push(r);
  });
  return createGroups(classMap, numGroups);
};

export const createGroupsHandler = (fileHandler) => async (input, options) => {
  const { readFlowJson, tempDir, tempDefault, writeToTemp } = fileHandler();
  if (!input) throw new Error('Please provide a number of groups to create');
  const students = await readFlowJson(tempDir + tempDefault);
  const groups = sortByAverages(students, parseInt(input));
  await writeToTemp(tempDir + '/groups.json', groups);
  Object.values(groups).forEach((g) => console.table(g));
};
