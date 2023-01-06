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
  handleCreateGroups,
  handleClearData,
  handleAssign
] = handlers;

const PROGRAM_NAME = "GROUPER";

const program = new Command()
  .name(PROGRAM_NAME.toLowerCase())
  .version("1.0.0")
  .description(TitleDecor(PROGRAM_NAME));

const Cmnd = (cmndName, description, action) => (program) =>
  program.command(cmndName).description(description).action(action);

const [
  AddStudent,
  ColorCode,
  ImportLocal,
  ExportCollections,
  CreateGroups,
  ClearData,
  Assign
] = [
  Cmnd("add-student", "Manually add a single student", handleAddStudent),
  Cmnd("color-list", "List students and color code by gpa", handleColorCode),
  Cmnd("import <path>", "Import local file", handleImport),
  Cmnd("export", "Export current class collections", handleExport),
  Cmnd(
    "create-groups <num-groups>",
    "Create a given number of groups",
    handleCreateGroups
  ),
  Cmnd("empty", "Clear specified filestore", handleClearData),
  Cmnd(
    "assign <path>",
    "Parse file -> Write students to collections -> Create and assign groups -> Write groups to collections",
    handleAssign
  )
].map((fn) => fn(program));

ExportCollections.option(
  "-ft|--file-type <type>",
  "Type of export file | default: csv",
  "csv"
).option(
  "-ct|--collection-type <type>",
  "Type of collection to export | default: students",
  "students"
);

Assign.option(
  "-s|--group-size <size>",
  "Target number of students per group | default: 5",
  "5"
);

export default program;
