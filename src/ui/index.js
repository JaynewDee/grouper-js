import inquirer from "inquirer";
import { addStudent, confirmClear } from "./prompts.js";

const addStudentPrompt = async () => await inquirer.prompt(addStudent);
const confirmClearPrompt = async () => await inquirer.prompt(confirmClear);
export { addStudentPrompt, confirmClearPrompt };
