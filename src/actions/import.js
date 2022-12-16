/**
 * Import and parse input file
 * @module actions/import
 */
/**
 *
 * @param {String} input User-specified filepath.
 * @param {Object} options
 * @returns
 */

export const importHandler = (fileHandler) => async (input, options) => {
  const {
    ext,
    absolute,
    tempDir,
    tempDefault,
    readFlowJson,
    toJsonFlow,
    writeToTemp
  } = fileHandler(input);
  const temp = tempDir + tempDefault;
  if (ext === ".csv") {
    const jsonArray = await toJsonFlow(absolute);
    writeToTemp(temp, jsonArray);
    console.table(jsonArray);
    console.log(
      `The above data was successfully written to ${tempDefault} @ ${tempDir}`
    );
  }
  if (ext === ".json") {
    const jsonArray = readFlowJson(absolute);
    console.table(jsonArray);
    writeToTemp(temp, jsonArray);
  }
};
