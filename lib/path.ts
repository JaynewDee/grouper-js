// Builds paths for file handler by windows vs posix

import { tmpdir } from "os";
import { sep, extname } from "path";

type Extension = string | null;

export interface PResolver {
  ext: Extension;
  localAbsolute: string;
  studentsWritePath: string;
  groupsWritePath: string;
}
export const PathResolver = (input: string | object): PResolver => ({
  ext: typeof input === "string" ? extname(input) : null,
  localAbsolute: `${process.cwd() + sep + input}`,
  studentsWritePath: tmpdir() + `${sep}students.json`,
  groupsWritePath: tmpdir() + `${sep}groups.json`
});
