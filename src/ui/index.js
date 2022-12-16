import inquirer from "inquirer";
import { addStudent } from "./prompts.js";

const addStudentPrompt = async () => await inquirer.prompt(addStudent);

export { addStudentPrompt };
