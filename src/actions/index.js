/**
 * Actions Module
 * @module actions
 */

import { FileHandler } from '../lib/fs.js';

import { addStudent } from './addStudent.js';
import { importHandler } from './import.js';
import { exportHandler } from './export.js';
import { listPassing } from './listPassing.js';
import { clearData } from './clearData.js';
import { createGroupsHandler } from './createGroups.js';

export const handleAddStudent = addStudent(FileHandler);
export const handleImport = importHandler(FileHandler);
export const handleExport = exportHandler(FileHandler);
export const handleColorCode = listPassing(FileHandler);
export const handleClearMemory = clearData(FileHandler);
export const handleCreateGroups = createGroupsHandler(FileHandler);
