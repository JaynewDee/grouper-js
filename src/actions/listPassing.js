/**
 * @module actions/colorCode
 */

/**
 * @param {Object[]} studentList json array read from file
 */
import { Rb, G, B, Y } from "../lib/decor.js";

const getLetter = (avg) =>
  avg <= 100 && avg >= 90
    ? "A"
    : avg <= 89 && avg >= 80
    ? "B"
    : avg <= 79 && avg >= 70
    ? "C"
    : "F";

const logColors = (studentList) =>
  studentList && studentList.length
    ? studentList.map(({ name, avg }) =>
        getLetter(avg) === "A"
          ? console.log(G(`${name}`))
          : getLetter(avg) === "B"
          ? console.log(B(name))
          : getLetter(avg) === "C"
          ? console.log(Y(name))
          : console.log(Rb(name))
      )
    : console.log(
        Rb(`No students found ... \nImport a file or manually add students`)
      );

export const listPassing = (fileHandler) => async (input, options) => {
  const { tempDir, tempDefault, readFlowJson } = fileHandler();
  const students = await JSON.parse(readFlowJson(tempDir + tempDefault));
  logColors(students);
};
