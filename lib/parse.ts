import csv from "csvtojson";
import { parse } from "json2csv";
import { FileNotFound, ParseError } from "./error.js";
import { Student } from "./models.js";
import { StudentType } from "./models.js";

const { name, avg, group } = Object.freeze({
  name: new RegExp(/name|studentname/i),
  avg: new RegExp(/avg|average|gpa/i),
  group: new RegExp(/group|team|/i)
});

const getFields = (studentsArr: StudentType[]) =>
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

const readCsv = async (path: string) => {
  try {
    return await csv().fromFile(path);
  } catch (err) {
    ParseError();
    return [];
  }
};

const convertFormattedCsvToJson = async (path: string) =>
  readCsv(path)
    .then((jsonArr) => getFields(jsonArr))
    .catch((err) => console.error(err));

const convertFormattedJsonToCsv = (jsonData: any): ParserReturn =>
  parse(jsonData);

const convertGroupsJsonToCsv = (jsonData: any): ParserReturn =>
  parse(jsonData, { fields: ["name", "avg", "group"] });

const bcsToUsable = async (path: string) => {
  try {
    return await readCsv(path).then((messy) => {
      if (!messy.length) {
        return FileNotFound();
      }

      const clean = messy
        .map((val) =>
          Student(val["Student"], parseFloat(val["Current Score"]), "0")
        )
        .filter(
          (obj) =>
            obj.name !== "Points Possible" && obj.name !== "Student, Test"
        );

      for (const item of clean) {
        const noName = item.name === undefined;
        const noAvg = isNaN(item.avg);

        if (noName || noAvg) {
          return ParseError();
        }
      }

      return clean;
    });
  } catch (err) {
    console.error(err);
  }
};

export type ParserData = StudentType[] | [];

export type ParserReturn =
  | Promise<StudentType[]>
  | Promise<void | {}[]>
  | Error
  | string;

export const FileParser =
  (type: string, data: any) =>
  (path: string): any => {
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
