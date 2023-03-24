/**
 * @module lib
 */

import fs from "fs";
import { writeFile } from "node:fs/promises";
import { PathResolver, PResolver } from "./path.js";
import { FileParser, ParserReturn } from "./parse.js";
import { StudentType } from "./models.js";

const readFlowJson = (path: string) => fs.readFileSync(path);

const writeToTemp = async (pathToTemp: string, data: StudentType[]) =>
  await writeFile(pathToTemp, JSON.stringify(data));

const clearStorage = (storagePath: string) => writeToTemp(storagePath, []);

const exportAsCsv = async (filename: string, csvdata: any) =>
  await writeFile(filename, csvdata);

/**
 *
 * @constructor
 * @typedef {FileHandler}
 * @type {object}
 * @param {any} input
 * @property {object} paths
 * @property {Function} readFlowJson pipe file into readable json
 * @property {Function} convertFormattedCsvToJson convert csv to json
 * @property {Function} clearStorage empty user-specified collection
 * @property {Function} writeToTemp write data to temp file
 * @property {Function} convertJsonToCsv convert json to csv
 * @property {Function} convertGroupsJsonToCsv
 * @property {Function} exportAsCsv
 * @property {Function} asyncTryCatch
 */

export interface FHShape {
  paths: PResolver;
  parser: (type: string, data: []) => (path: string) => ParserReturn;
  readFlowJson: (path: string) => Buffer;
  writeToTemp: (path: string, data: StudentType[]) => Promise<void>;
  clearStorage: (path: string) => Promise<void>;
  exportAsCsv: (filename: string, data: any) => Promise<void>;
}

export type OptionsObject = {
  fileType?: string;
  collectionType?: string;
  groupSize?: string;
};

export type Input = OptionsObject | string | any;

export type FHType = (input?: Input) => FHShape;

export const FileHandler = (input: Input): FHShape => ({
  paths: PathResolver(input),
  parser: FileParser,
  readFlowJson,
  writeToTemp,
  clearStorage,
  exportAsCsv
});
