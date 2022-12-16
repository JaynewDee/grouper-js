/**
 * Actions Module
 * @module actions
 */

import { addStudent } from "./addStudent.js";
import { importHandler } from "./import.js";
import { listPassing } from "./listPassing.js";
import { FileHandler } from "../lib/fs.js";

const handleAddStudent = addStudent(FileHandler);
const handleImport = importHandler(FileHandler);

export { handleAddStudent, handleImport, listPassing };
