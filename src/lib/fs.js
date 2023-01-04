/**
 * @module lib
 */

import fs from "fs";
import csv from "csvtojson";
import { parse } from "json2csv";
import { writeFile } from "node:fs/promises";
import { pathResolver } from "./path.js";
import { FileNotFound } from "./error.js";

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

const asyncTryCatch =
  (fn) =>
  async (...fnArgs) => {
    try {
      return await fn(...fnArgs);
    } catch (err) {
      console.log(err.name);
      FileNotFound();
      process.exit(1);
    }
  };

const readFlowJson = (path) => fs.readFileSync(path);

const convertCsvToJson = async (absPath) =>
  await csv()
    .fromFile(absPath)
    .then((jsonArr) => getFields(jsonArr));

const writeToTemp = async (pathToTemp, data) =>
  await writeFile(pathToTemp, JSON.stringify(data));

const clearStorage = (storagePath) => writeToTemp(storagePath, []);

const convertJsonToCsv = (jsonData) => parse(jsonData);

const convertGroupsJsonToCsv = (jsonData) =>
  parse(jsonData, { fields: ["name", "avg", "group"] });

const exportAsCsv = async (filename, csvdata) =>
  await writeFile(filename, csvdata);

/**
 *
 * @constructor
 * @typedef {FileHandler}
 * @type {object}
 * @param {object || string} input
 * @param {object} paths
 * @property {Function} readFlowJson pipe file into readable json
 * @property {Function} convertCsvToJson convert csv to json
 * @property {Function} clearStorage empty user-specified collection
 * @property {Function} writeToTemp write data to temp file
 * @property {Function} convertJsonToCsv convert json to csv
 * @property {Function} convertGroupsJsonToCsv
 * @property {Function} exportAsCsv
 * @property {Function} asyncTryCatch
 */
export const FileHandler = (input = {}) => ({
  paths: pathResolver(input),
  readFlowJson,
  convertCsvToJson,
  writeToTemp,
  clearStorage,
  convertJsonToCsv,
  convertGroupsJsonToCsv,
  exportAsCsv,
  asyncTryCatch
});
