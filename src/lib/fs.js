import fs from "fs";

const readFile = (absPath) => fs.readFileSync(absPath);

/**
 *
 * @param {string} type Type of file (json, csv, ...)
 * @returns
 */
export const FileHandler = (type) => ({
  type,
  readFile
});
