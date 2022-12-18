/**
 * Program configuration module.
 * @module program
 */
import { Argument, Command } from "commander";
import { TitleDecor } from "../lib/decor.js";
import { pipe } from "../lib/func.js";
import {
  handleColorCode,
  handleAddStudent,
  handleImport,
  handleExport,
  handleClearMemory
} from "../actions/index.js";

const PROGRAM_NAME = "GROUPER";

const program = new Command()
  .name(PROGRAM_NAME.toLowerCase())
  .version("1.0.0")
  .description(TitleDecor(PROGRAM_NAME));

/**
 *
 * @param {string} cmdStr name of command
 * @param {string} descrStr command description
 * @param {Function} actionFn action handler
 * @returns {Command}
 */
const Base = (cmdStr, descrStr, actionFn) => (program) =>
  program.command(cmdStr).description(descrStr).action(actionFn);

/**
 *
 * @param {string[]} options option flags to attach to command
 * @returns {Command}
 */
const Options = (options) => (program) =>
  options.length
    ? options.map((opt) => program.addOption(new Option(opt)))
    : program;

/**
 *
 * @param {string[]} args optional arguments to attach to command
 * @returns {Command}
 */
const Arguments = (args) => (program) =>
  args.length
    ? args.map((arg) => program.addArgument(new Argument(arg)))
    : program;

/**
 *
 * @param {string} cmdStr
 * @param {string} descrStr
 * @param {*} actionFn
 * @param {Option[]} options
 * @param {Argument[]} args
 * @returns
 */
const Cmnd =
  (cmdStr, descrStr, actionFn, options = [], args = []) =>
  (program) =>
    pipe(
      Base(cmdStr, descrStr, actionFn)(program),
      Options(options),
      Arguments(args)
    );

const ColorCodedData = Cmnd(
  "color-list",
  "List students by pass or fail",
  handleColorCode
);
const AddStudentManual = Cmnd(
  "add-student",
  "Manually add a single student",
  handleAddStudent
);
const ImportLocalFile = Cmnd(
  "import",
  "Import file",
  handleImport,
  [],
  [`<file_path>`]
);
const ExportCollections = Cmnd(
  "export",
  "Export current class collections",
  handleExport,
  [`"-ft|--ftype", "Set type of exported file"`]
);
const ClearCollections = Cmnd(
  "clear",
  "Clear current group data from local memory",
  handleClearMemory
);

ColorCodedData(program);
AddStudentManual(program);
ImportLocalFile(program);
ExportCollections(program);
ClearCollections(program);

export default program;
