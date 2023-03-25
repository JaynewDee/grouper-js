import csv from "csvtojson";
import { parse } from "json2csv";
import { FileNotFound } from "./error.js";
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

const readCsv = async (path: string) => await csv().fromFile(path);

const convertFormattedCsvToJson = async (path: string) =>
  readCsv(path)
    .then((jsonArr) => getFields(jsonArr))
    .catch((err) => console.error(err));

const convertFormattedJsonToCsv = (jsonData: any): ParserReturn =>
  parse(jsonData);

const convertGroupsJsonToCsv = (jsonData: any): ParserReturn =>
  parse(jsonData, { fields: ["name", "avg", "group"] });

const bcsToUsable = async (path: string) =>
  await readCsv(path).then((messy) => {
    if (!messy.length) {
      throw FileNotFound();
    }

    return messy
      .map((val) =>
        Student(val["Student"], parseFloat(val["Current Score"]), "0")
      )
      .filter(
        (obj) => obj.name !== "Points Possible" && obj.name !== "Student, Test"
      );
  });

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
