/**
 * Program configuration module.
 * @module program
 */
import { Command } from "commander";
import { TitleDecor } from "../lib/decor.js";

import { handlers } from "../actions/index.js";
import { Input } from "../lib/fs.js";

const [
  handleAddStudent,
  handleColorCode,
  handleImport,
  handleExport,
  handleClearData,
  handleAssign
] = handlers;

const PROGRAM_NAME = "GROUPER";

const program = new Command()
  .name(PROGRAM_NAME.toLowerCase())
  .version("1.0.0")
  .description(TitleDecor(PROGRAM_NAME));

type ActionHandler =
  | ((
      input: Input,
      options: {
        [key: string]: number;
      }
    ) => Promise<void>)
  | ((input: string) => Promise<void>);

const Cmnd =
  (cmndName: string, description: string, action: ActionHandler) =>
  (program: Command) =>
    program.command(cmndName).description(description).action(action);

const [
  _AddStudent,
  _ColorCode,
  _ImportLocal,
  ExportCollections,
  _ClearData,
  Assign
] = [
  Cmnd("add-student", "Manually add a single student", handleAddStudent),
  Cmnd("color-list", "List students and color code by gpa", handleColorCode),
  Cmnd("import <path>", "Import local file", handleImport),
  Cmnd("export", "Export current class collections", handleExport),
  Cmnd("empty", "Clear specified filestore", handleClearData),
  Cmnd(
    "assign <path>",
    "Parse file -> Write students to collections -> Create and assign groups -> Write groups to collections -> Export groups as CSV",
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
