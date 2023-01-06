import csv from "csvtojson";
import { parse } from "json2csv";

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

const convertFormattedCsvToJson = async (absPath) =>
  await csv()
    .fromFile(absPath)
    .then((jsonArr) => getFields(jsonArr));

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
