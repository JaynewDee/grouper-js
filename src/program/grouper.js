/**
 * Program configuration module.
 * @module program
 */
import { Command } from "commander";
import { TitleDecor } from "../lib/decor.js";

import handlers from "../actions/index.js";
const [
  handleAddStudent,
  handleColorCode,
  handleImport,
  handleExport,
  handleCreateGroups
] = handlers;

const PROGRAM_NAME = "GROUPER";

const program = new Command()
  .name(PROGRAM_NAME.toLowerCase())
  .version("1.0.0")
  .description(TitleDecor(PROGRAM_NAME));

program
  .command("add-student")
  .description("Manually add a single student")
  .action(handleAddStudent);

program
  .command("color-list")
  .description("List students and color code by gpa")
  .action(handleColorCode);

program
  .command("import <file-path>")
  .description("Import local file")
  .action(handleImport);

program
  .command("export")
  .description("Export current class collections")
  .action(handleExport)
  .option("-ft|--filetype <type>", "Type of export file | default: csv", "csv");

program
  .command("create-groups")
  .description("Create groups with a given group size")
  .action(handleCreateGroups)
  .option("-gs|--group-size <size>", "Size of each group | default: 6", "6");

export default program;
