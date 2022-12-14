const { Command } = require("commander");
const { listPassing, addStudent } = require("../actions/index");

const program = new Command();
console.log(program);
const Program = (commandStr, descriptionStr, actionFunction) =>
  program
    .command(commandStr)
    .description(descriptionStr)
    .action(actionFunction);

Program("list-passing", "List students by pass or fail", listPassing);
Program("add", "Add Student", addStudent);

module.exports = program;
