/**
 * @module lib
 */

import fs from "fs";
import { writeFile } from "node:fs/promises";
import { PathResolver } from "./path.js";
import { FileNotFound } from "./error.js";
import { FileParser } from "./parse.js";

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

const writeToTemp = async (pathToTemp, data) =>
  await writeFile(pathToTemp, JSON.stringify(data));

const clearStorage = (storagePath) => writeToTemp(storagePath, []);

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
 * @property {Function} convertFormattedCsvToJson convert csv to json
 * @property {Function} clearStorage empty user-specified collection
 * @property {Function} writeToTemp write data to temp file
 * @property {Function} convertJsonToCsv convert json to csv
 * @property {Function} convertGroupsJsonToCsv
 * @property {Function} exportAsCsv
 * @property {Function} asyncTryCatch
 */
export const FileHandler = (input = {}) => ({
  paths: PathResolver(input),
  parser: FileParser,
  readFlowJson,
  writeToTemp,
  clearStorage,
  exportAsCsv,
  asyncTryCatch
});
