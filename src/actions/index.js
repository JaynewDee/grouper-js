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

export const handlers = [
  addStudent,
  colorList,
  importHandler,
  exportHandler,
  createGroupsHandler,
  clearData
].map((fn) => fn(FileHandler));
