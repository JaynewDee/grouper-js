/**
 * @module actions/colorList
 */

/**
 * @param {Object[]} studentList json array read from file
 */
import { Rb, G, B, Y } from "../lib/decor.js";
import { StudentType } from "../lib/models.js";
import { FHType } from "../lib/fs.js";
const getLetter = (avg: number) =>
  avg <= 100 && avg >= 90
    ? "A"
    : avg <= 89 && avg >= 80
    ? "B"
    : avg <= 79 && avg >= 70
    ? "C"
    : "F";

const logColors = (studentList: StudentType[]) =>
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

export const colorList = (fileHandler: FHType) => async () => {
  const { paths, readFlowJson } = fileHandler();
  const { studentsWritePath } = paths;
  const students = readFlowJson(studentsWritePath).toString();
  const parsed = await JSON.parse(students);
  logColors(parsed);
};
