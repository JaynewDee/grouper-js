/**
 * Manually add student to existing data
 * @module actions
 */

import { Student } from "../lib/models.js";
import { addStudentPrompt } from "../ui/index.js";

export const addStudent = (fileHandler) => async (input, options) => {
  const { readFlowJson, tempDir, tempDefault, writeToTemp } = fileHandler();
  const path = tempDir + tempDefault;
  const { name, avg, groupNum } = await addStudentPrompt();
  const newStudent = Student(name, avg, parseInt(groupNum));
  const studentsJson = JSON.parse(readFlowJson(path));
  writeToTemp(path, [...studentsJson, newStudent]);
};
