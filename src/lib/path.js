// Builds paths for file handler by windows vs posix

import { tmpdir } from "os";
import { sep } from "path";

/**
 * @constructor
 * @typedef {pathResolver}
 * @param {string} input
 * @returns {object[...string]}
 */

export const pathResolver = (input = "") => ({
  ext: Object.keys(input).length
    ? input.match(new RegExp(/\.(csv|json)/))[0]
    : "",
  localAbsolute: `${process.cwd()}/${input}`,
  studentsWritePath: tmpdir() + `${sep}students.json`,
  groupsWritePath: tmpdir() + `${sep}groups.json`
});
