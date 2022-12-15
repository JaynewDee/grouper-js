/**
 * Actions Module
 * @module actions
 */

import { addStudent } from "./addStudent.js";
import { listPassing } from "./listPassing.js";
import { handleImport } from "./handleImport.js";

export default {
  listPassing: listPassing(),
  addStudent: addStudent()(),
  handleImport
};
