/**
 * Manually add student to existing data
 * @module actions
 */

import { FHType } from "../lib/fs.js";
import { Student } from "../lib/models.js";
import { addStudentPrompt } from "../ui/index.js";

export const addStudent = (fileHandler: FHType) => async () => {
  const { readFlowJson, paths, writeToTemp } = fileHandler();
  const { studentsWritePath } = paths;

  const { name, avg, groupNum } = await addStudentPrompt();

  const newStudent = Student(name, avg, groupNum || "0");
  const fromBuffer = readFlowJson(studentsWritePath).toString();
  const studentsJson = JSON.parse(fromBuffer);
  writeToTemp(studentsWritePath, [...studentsJson, newStudent]);
};
