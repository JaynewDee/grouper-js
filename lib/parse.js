import csv from "csvtojson";
import { parse } from "json2csv";
import { Student } from "./models.js";
const { round } = Math;

const { name, avg, group } = Object.freeze({
  name: new RegExp(/name|studentname/i),
  avg: new RegExp(/avg|average|gpa/i),
  group: new RegExp(/group|team|/i)
});

const getFields = (studentsArr) =>
  studentsArr.map((studentObj) =>
    Object.entries(studentObj).reduce(
      (acc, [key, val]) =>
        key.match(name)
          ? { ...acc, name: val }
          : key.match(avg)
          ? { ...acc, avg: parseInt(val) }
          : key.match(group)
          ? { ...acc, group: val }
          : acc,
      {}
    )
  );

const readCsv = async (absPath) => await csv().fromFile(absPath);

const convertFormattedCsvToJson = async (absPath) =>
  readCsv(absPath)
    .then((jsonArr) => getFields(jsonArr))
    .catch((err) => console.error(err));

const convertFormattedJsonToCsv = (jsonData) => parse(jsonData);

const convertGroupsJsonToCsv = (jsonData) =>
  parse(jsonData, { fields: ["name", "avg", "group"] });

/**
 * @constructor
 * @returns {object}
 */
export const FileParser =
  (type = "", data = []) =>
  async (path = "") => {
    switch (type) {
      case "formattedCsv":
        return convertFormattedCsvToJson(path);
      case "formattedJson":
        return convertFormattedJsonToCsv(data);
      case "groupsJson":
        return convertGroupsJsonToCsv(data);
      case "":
        throw new Error("Mandatory argument 'type' not provided ... ");
      default:
        throw new Error("What have you done ... ");
    }
  };

const testPath = "../test-bcs.csv";
const bcsToUsable = async (path) =>
  await readCsv(path).then((messy) =>
    messy
      .map((val) => Student(val["Student"], val["Current Score"], 0))
      .filter(
        (obj) => obj.name !== "Points Possible" && obj.name !== "Student, Test"
      )
      .sort((a, b) => (a.avg > b.avg ? 1 : -1))
  );

const calcClassAvg = (students) =>
  students.reduce((acc, val) => (acc += val.avg), 0);

const importBcs = async (path) => {
  const students = await bcsToUsable(path);
  const classAvg = round(calcClassAvg(students) / students.length);
  console.log(classAvg);
};

importBcs(testPath);
