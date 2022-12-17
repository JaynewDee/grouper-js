/**
 * Import and parse input file
 * @module actions/import
 */

import { Student } from "../lib/models.js";

/**
 * @param {fileHandler} FileHandler
 * @param {string} input User-specified filepath.
 * @param {object} options
 * @returns {void}
 */

export const importHandler = (fileHandler) => async (input, options) => {
  const {
    ext,
    absolute,
    tempDir,
    tempDefault,
    readFlowJson,
    convertCsvToJson,
    writeToTemp
  } = fileHandler(input);

  const temp = tempDir + tempDefault;

  if (ext === ".csv") {
    const jsonArray = await convertCsvToJson(absolute);
    const students = jsonArray.map((student) =>
      Student(student.name, student.avg, student.group)
    );
    writeToTemp(temp, students);
    console.table(jsonArray);
    console.log(
      `The above data was successfully written to ${tempDefault} @ ${tempDir}`
    );
  }
  if (ext === ".json") {
    const jsonArray = readFlowJson(absolute);
    writeToTemp(temp, jsonArray);
  }
};
