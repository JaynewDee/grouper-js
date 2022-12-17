/**
 *
 * @param {Object[]} studentList json array read from file
 * @returns
 */
import { Rb, G, B, Y } from "../lib/decor.js";

const evaluatePassing = (studentList) =>
  studentList && studentList.length
    ? studentList.map(({ name, colorCode }) =>
        colorCode === "green"
          ? console.log(G(`${name}`))
          : colorCode === "blue"
          ? console.log(B(name))
          : colorCode === "yellow"
          ? console.log(Y(name))
          : colorCode === "red"
          ? console.log(Rb(name))
          : console.log(name)
      )
    : console.log(yellow(`No students found ...`));

export const listPassing = (fileHandler) => async (input, options) => {
  const { tempDir, tempDefault, readFlowJson } = fileHandler();
  const students = await JSON.parse(readFlowJson(tempDir + tempDefault));
  evaluatePassing(students);
};
