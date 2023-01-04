/**
 * @module actions
 */

/**
 *
 * @param {Function} fileHandler
 */

export const exportHandler = (fileHandler) => async (input, options) => {
  const {
    convertJsonToCsv,
    convertGroupsJsonToCsv,
    readFlowJson,
    exportAsCsv,
    paths
  } = fileHandler();

  const { studentsWritePath, groupsWritePath } = paths;
  const { filetype, collectionType } = input;

  if (collectionType === "students") {
    if (filetype === "csv") {
      try {
        const tempData = JSON.parse(readFlowJson(studentsWritePath));
        const csv = convertJsonToCsv(tempData);
        await exportAsCsv("./students.csv", csv);
      } catch (err) {
        console.error(err);
      }
    }
  } else if (collectionType === "groups") {
    try {
      const classArr = [];
      const tempData = JSON.parse(readFlowJson(groupsWritePath));
      Object.values(tempData).forEach((group) => classArr.push(...group));
      const csv = convertGroupsJsonToCsv(classArr);
      await exportAsCsv("./groups.csv", csv);
    } catch (err) {
      console.error(err);
    }
  }
};
