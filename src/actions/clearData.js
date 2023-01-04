/**
 * @module actions/clearData
 */
import { confirmClearPrompt } from "../ui/index.js";

export const clearData = (fileHandler) => async () => {
  const { clearStorage, paths } = fileHandler();
  const { studentsWritePath } = paths;

  const isAGo = await confirmClearPrompt();

  isAGo.confirmClearAgain
    ? clearStorage(studentsWritePath)
    : console.warn(`Operation ABORTED.  Storage was not reset.`);
};
