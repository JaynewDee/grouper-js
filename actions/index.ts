/**
 * Actions Module
 * @module actions
 */

import { FileHandler } from '../lib/fs.js';

import { addStudent } from './addStudent.js';
import { exportHandler } from './export.js';
import { colorList } from './colorList.js';
import { clearData } from './clearData.js';
import { assignGroups } from './assign.js';

export const handlers = [
  addStudent,
  colorList,
  exportHandler,
  clearData,
  assignGroups,
].map((fn) => fn(FileHandler));
