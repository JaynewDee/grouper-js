/**
 * Program configuration module.
 * @module program
 */
import { Command } from "commander";
import ACTIONS from "../actions/index.js";
import { Decor } from "../lib/decor.js";
const { listPassing, addStudent, handleImport } = ACTIONS;

const program = new Command()
  .name("grouper")
  .version("1.0.0")
  .description(Decor("GROUPER"));

/**
 * Program factory attaches essential config to each command
 * @param {String} cmdStr determines name and execution of command
 * @param {String} descrStr determines command description
 * @param {Function} actionFn input handler
 * @returns {Command}
 */
const Program = (cmdStr, descrStr, actionFn) =>
  program.command(cmdStr).description(descrStr).action(actionFn);

Program("list-passing", "List students by pass or fail", listPassing);
Program("add <student_name>", "Manually add a single student", addStudent);
Program("import <file_path>", "Import file", handleImport);

export default program;
