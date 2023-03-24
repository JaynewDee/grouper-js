/**
 * Program configuration module.
 * @module program
 */
import { Command } from "commander";
import { TitleDecor } from "../lib/decor.js";

import { handlers } from "../actions/index.js";
import { Input } from "../lib/fs.js";

const [handleAssign] = handlers;

const PROGRAM_NAME = "GROUPER";

const program = new Command()
  .name(PROGRAM_NAME.toLowerCase())
  .version("1.0.0")
  .description(TitleDecor(PROGRAM_NAME));

program
  .command("assign <path>")
  .description(
    "Parse file -> Write students to collections -> Create and assign groups -> Write groups to collections -> Export groups as CSV"
  )
  .action(handleAssign)
  .option(
    "-s|--group-size <size>",
    "Target number of students per group | default: 5"
  );

export default program;
