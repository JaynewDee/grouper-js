/**
 * Import and parse input file
 * @module actions/handleImport
 */
import { FileHandler } from "../lib/fs.js";

const { log } = console;

const matchExt = new RegExp(/\.\w{1,4}/);

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
