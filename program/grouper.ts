/**
 * Program configuration module.
 * @module program
 */
import { Command } from "commander";
import { TitleDecor } from "../lib/decor.js";

import { handler as assignHandler } from "../actions/index.js";

const PROGRAM_NAME = "GROUPER";

const program = new Command()
  .name(PROGRAM_NAME.toLowerCase())
  .version("1.0.0")
  .description(TitleDecor(PROGRAM_NAME));

program
  .command("assign")
  .argument("<path>")
  .description(
    "Parse file -> Write students to collections -> Create and assign groups -> Write groups to collections -> Export groups as CSV"
  )
  .option(
    "-s, --group-size <size>",
    "Target number of students per group | default: 5"
  )
  .action(assignHandler);

export default program;
