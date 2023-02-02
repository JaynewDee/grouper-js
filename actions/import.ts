/**
 * Import and parse input file
 * @module actions
 */

import { Student } from "../lib/models.js";

export const importHandler = (fileHandler: any) => async (input: string) => {
  const { readFlowJson, parser, writeToTemp, paths } = fileHandler(input);

  const { ext, localAbsolute, studentsWritePath } = paths;

  if (ext === ".csv") {
    const jsonArray: any = await parser("formattedCsv", [])(localAbsolute);

    const students = jsonArray.map((student: any) =>
      Student(student.name, student.avg, student.group)
    );

    writeToTemp(studentsWritePath, students);
    console.table(jsonArray);
    console.log(
      `The above data was successfully written to ${studentsWritePath}`
    );
  }

  if (ext === ".json") {
    const jsonArray: any = readFlowJson(localAbsolute);
    writeToTemp(studentsWritePath, jsonArray);
  }
};
