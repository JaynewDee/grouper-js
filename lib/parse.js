import csv from "csvtojson";
import { parse } from "json2csv";
import { Student } from "./models.js";

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

const bcsToUsable = async (path) =>
  await readCsv(path).then((messy) =>
    messy
      .map((val) =>
        Student(val["Student"], parseFloat(val["Current Score"]), 0)
      )
      .filter(
        (obj) => obj.name !== "Points Possible" && obj.name !== "Student, Test"
      )
  );

/**
 * @constructor
 * @returns {object}
 */
export const FileParser =
  (type, data = []) =>
  (path = "") => {
    switch (type) {
      case "formattedCsv":
        return convertFormattedCsvToJson(path);
      case "formattedJson":
        return convertFormattedJsonToCsv(data);
      case "groupsJson":
        return convertGroupsJsonToCsv(data);
      case "bcsGroups":
        return bcsToUsable(path);
      case "":
        throw new Error("Mandatory argument 'type' not provided ... ");
      default:
        throw new Error("What have you done? ... ");
    }
  };
