/**
 * @module actions
 */

/**
 *
 * @param {Function} fileHandler
 */

export const exportHandler = (fileHandler) => async (input) => {
  const { convertJsonToCsv, readFlowJson, tempDir, tempDefault, exportAsCsv } =
    fileHandler();
  const { filetype } = input;
  if (filetype === "csv") {
    try {
      const tempData = JSON.parse(readFlowJson(tempDir + tempDefault));
      const csv = convertJsonToCsv(tempData);
      await exportAsCsv("./collections.csv", csv);
    } catch (err) {
      console.error(err);
    }
  }
};
