/**
 * Actions Module
 * @module actions
 */

import { FileHandler } from "../lib/fs.js";
import { assignGroups } from "./assign/assign.js";

export const handlers = [assignGroups].map((fn) => fn(FileHandler));
