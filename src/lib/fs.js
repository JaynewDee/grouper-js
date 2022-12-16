import fs from "fs";
import os from "os";
import csv from "csvtojson";
import { pipe } from "./func.js";
import { writeFile } from "node:fs/promises";

const getAbsolutePath = (input) => `${process.cwd()}\\${input}`;

const readJson = (path) => fs.readFileSync(path);
const readFlowJson = pipe(readJson);

const csvToJson = async (absPath) => await csv().fromFile(absPath);
const toJsonFlow = pipe(csvToJson);

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

/**
 *
 * @param {string} source User input
 * @returns {Object}
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
  toJsonFlow,
  initStorage,
  writeToTemp,
  convertJsonToCsv
});
