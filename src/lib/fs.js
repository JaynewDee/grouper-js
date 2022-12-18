/**
 * @module lib
 */

import fs from "fs";
import os from "os";
import csv from "csvtojson";
import { pipe } from "./func.js";
import { writeFile } from "node:fs/promises";

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

const getAbsolutePath = (input) => `${process.cwd()}\\${input}`;

const readFlowJson = (path) => fs.readFileSync(path);

const convertCsvToJson = async (absPath) =>
  await csv()
    .fromFile(absPath)
    .then((jsonArr) => getFields(jsonArr));

const initStorage = async (pathToTemp) =>
  await writeFile(pathToTemp, JSON.stringify([]));

const writeToTemp = async (pathToTemp, data) =>
  await writeFile(pathToTemp, JSON.stringify(data));

const replacer = (key, value) => (value === null ? "" : value);
const convertJsonToCsv = (jsonArr) => (headers) =>
  [
    headers.join(","),
    ...jsonArr.map((row) =>
      headers.map((field) => JSON.stringify(row[field], replacer)).join(",")
    )
  ].join("\r\n");

const clearStorage = (storagePath) => writeToTemp(storagePath, []);

/**
 *
 * @constructor
 * @typedef {FileHandler}
 * @type {object}
 * @param {object} source
 * @property {object} source user input
 * @property {string} ext extension of source file
 * @property {string} absolute full path to input file
 * @property {string} tempDir user's os-determined tempfile directory
 * @property {string} tempDefault default name of saved temp file
 * @property {Function} readFlowJson pipe file into readable json
 * @property {Function} convertCsvToJson convert csv to json
 * @property {Function} initStorage create temp file if not exists
 * @property {Function} writeToTemp write data to temp file
 * @property {Function} convertJsonToCsv covert json to csv
 */
export const FileHandler = (source = {}) => ({
  source,
  ext: Object.keys(source).length
    ? source.match(new RegExp(/\.(csv|json)/))[0]
    : "",
  absolute: getAbsolutePath(source),
  tempDir: os.tmpdir(),
  tempDefault: `\\grouper-students.json`,
  readFlowJson,
  convertCsvToJson,
  initStorage,
  writeToTemp,
  convertJsonToCsv,
  clearStorage
});
