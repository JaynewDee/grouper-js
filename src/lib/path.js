// Builds paths for file handler by windows vs posix

import { tmpdir } from "os";
import { sep, extname } from "path";

/**
 * @constructor
 * @typedef {pathResolver}
 * @param {string} input
 * @returns {object[...string]}
 */

export const pathResolver = (input = "") => ({
  ext: extname(input),
  localAbsolute: `${process.cwd()}/${input}`,
  studentsWritePath: tmpdir() + `${sep}students.json`,
  groupsWritePath: tmpdir() + `${sep}groups.json`
});
