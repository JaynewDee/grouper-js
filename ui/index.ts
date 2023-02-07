import inquirer from "inquirer";
import { addStudent, getFileToClear, confirmClear } from "./prompts.js";

const { prompt } = inquirer;

const addStudentPrompt = async () => await prompt(addStudent);
const fileClearPrompt = async () => await prompt(getFileToClear);
const confirmClearPrompt = async () => await prompt(confirmClear);

export { addStudentPrompt, fileClearPrompt, confirmClearPrompt };
