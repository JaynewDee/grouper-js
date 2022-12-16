/**
 * Program configuration module.
 * @module program
 */
import { Command } from "commander";
import { TitleDecor } from "../lib/decor.js";
import {
  listPassing,
  handleAddStudent,
  handleImport
} from "../actions/index.js";

// Initialize
const program = new Command()
  .name("grouper")
  .version("1.0.0")
  .description(TitleDecor("GROUPER"));

/**
 * Program factory attaches essential config to each command
 * @param {String} cmdStr determines name and execution of command
 * @param {String} descrStr determines command description
 * @param {Function} actionFn input handler
 * @returns {program.Command}
 */

const Program = (cmdStr, descrStr, actionFn) =>
  program.command(cmdStr).description(descrStr).action(actionFn);

Program("list-passing", "List students by pass or fail", listPassing);
Program("add-student", "Manually add a single student", handleAddStudent);
Program("import <file_path>", "Import file", handleImport);

export default program;
