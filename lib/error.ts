import { ErrorDecor } from "./decor.js";

const { log } = console;

export const FileNotFound = (): void =>
  log(
    ErrorDecor(
      `
      Something went wrong while handling your file.
      Please verify that the path to the file is correct.
      `
    )
  );

export const ParseError = (): void =>
  log(
    ErrorDecor(
      `
      Something went wrong while parsing your file.
      Please verify that the file is an appropriately-formatted BCS gradebook export.
      `
    )
  );
