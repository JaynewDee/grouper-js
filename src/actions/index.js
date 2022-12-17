/**
 * Actions Module
 * @module actions
 */

import { FileHandler } from "../lib/fs.js";

import { addStudent } from "./addStudent.js";
import { importHandler } from "./import.js";
import { exportHandler } from "./export.js";
import { listPassing } from "./listPassing.js";

const handleAddStudent = addStudent(FileHandler);
const handleImport = importHandler(FileHandler);
const handleExport = exportHandler(FileHandler);
const handleColorCode = listPassing(FileHandler);

export { handleAddStudent, handleImport, handleExport, handleColorCode };
