/**
 * Program configuration module.
 * @module program
 */
const { Command } = require("commander");
const { listPassing, addStudent } = require("../actions/index");

const program = new Command();

/**
 * Program factory attaches essential config to each command
 * @param {String} commandStr
 * @param {String} descriptionStr
 * @param {Function} actionFunction
 * @returns {Command}
 */
const Program = (commandStr, descriptionStr, actionFunction) =>
  program
    .command(commandStr)
    .description(descriptionStr)
    .action(actionFunction);

Program("list-passing", "List students by pass or fail", listPassing);
Program("add <student_name>", "Manually add a single student", addStudent);
Program("import <filename>", "Import file", handleImport);

module.exports = program;
