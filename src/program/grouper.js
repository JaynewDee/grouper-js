/**
 * Program configuration module.
 * @module program
 */
import { Command } from "commander";
import { TitleDecor } from "../lib/decor.js";

import { handlers } from "../actions/index.js";
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

const Cmnd = (cmndName, description, action) => (program) =>
  program.command(cmndName).description(description).action(action);

// Unused variables are simply commands without options attached
const [AddStudent, ColorCode, ImportLocal, ExportCollections, CreateGroups] = [
  Cmnd("add-student", "Manually add a single student", handleAddStudent),
  Cmnd("color-code", "List students and color code by gpa", handleColorCode),
  Cmnd("import <file-path>", "Import local file", handleImport),
  Cmnd("export", "Export current class collections", handleExport),
  Cmnd(
    "create-groups",
    "Create groups with a given group size",
    handleCreateGroups
  )
].map((fn) => fn(program));

ExportCollections.option(
  "-ft|--filetype <type>",
  "Type of export file | default: csv",
  "csv"
);

CreateGroups.option(
  "-gs|--group-size <size>",
  "Size of each group | default: 6",
  "6"
);

export default program;
