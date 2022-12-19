import inquirer from "inquirer";
import { addStudent, confirmClear } from "./prompts.js";

const { prompt } = inquirer;

const addStudentPrompt = async () => await prompt(addStudent);
const confirmClearPrompt = async () => await prompt(confirmClear);

export { addStudentPrompt, confirmClearPrompt };
