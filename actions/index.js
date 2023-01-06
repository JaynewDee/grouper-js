/**
 * Actions Module
 * @module actions
 */

import { FileHandler } from "../lib/fs.js";

import { addStudent } from "./addStudent.js";
import { importHandler } from "./import.js";
import { exportHandler } from "./export.js";
import { colorList } from "./colorList.js";
import { clearData } from "./clearData.js";
import { createGroupsHandler } from "./createGroups.js";
import { assignGroups } from "../lib/parse.js";

export const handlers = [
  addStudent,
  colorList,
  importHandler,
  exportHandler,
  createGroupsHandler,
  clearData,
  assignGroups
].map((fn) => fn(FileHandler));
