/**
 * Import and parse input file
 * @module actions
 */

import { Student } from "../lib/models.js";

/**
 * @param {Function} fileHandler
 * @param {string} input User-specified filepath.
 * @param {object} options
 */

export const importHandler = (fileHandler) => async (input) => {
  const { readFlowJson, convertCsvToJson, writeToTemp, asyncTryCatch, paths } =
    fileHandler(input);

  const { ext, localAbsolute, studentsWritePath } = paths;

  if (ext === ".csv") {
    const jsonArray = await asyncTryCatch(convertCsvToJson)(localAbsolute);
    const students = jsonArray.map((student) =>
      Student(student.name, student.avg, student.group)
    );
    writeToTemp(studentsWritePath, students);
    console.table(jsonArray);
    console.log(
      `The above data was successfully written to ${studentsWritePath}`
    );
  }
  if (ext === ".json") {
    const jsonArray = readFlowJson(localAbsolute);
    writeToTemp(temp, jsonArray);
  }
};
