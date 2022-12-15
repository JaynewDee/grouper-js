/**
 * Import and parse input file
 * @module actions/handleImport
 */
import fs from "fs";
const { log } = console;
const matchExt = new RegExp(/\.\w{1,4}/);

const readJson = (absPath) => fs.readFileSync(absPath);
const getAbsolutePath = (input) => `${process.cwd()}\\${input}`;

/**
 *
 * @param {String} str Path to file.
 * @param {Object} options
 */

export const handleImport = (str, options) => {
  if (str) {
    const extension = str.match(matchExt);
    const json = readJson(getAbsolutePath(str));
    log(JSON.parse(json));
  }
};

// const testOptions = {
//   file: "students.csv"
// };
