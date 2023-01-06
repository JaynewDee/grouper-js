/**
 * Manually add student to existing data
 * @module actions
 */

import { Student } from "../lib/models.js";
import { addStudentPrompt } from "../ui/index.js";

export const addStudent = (fileHandler) => async () => {
  const { readFlowJson, paths, writeToTemp } = fileHandler();
  const { studentsWritePath } = paths;
  const { name, avg, groupNum } = await addStudentPrompt();
  const newStudent = Student(name, avg, parseInt(groupNum));
  const studentsJson = JSON.parse(readFlowJson(studentsWritePath));
  writeToTemp(studentsWritePath, [...studentsJson, newStudent]);
};
