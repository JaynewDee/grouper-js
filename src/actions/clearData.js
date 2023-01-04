/**
 * @module actions/clearData
 */
import { confirmClearPrompt } from "../ui/index.js";

export const clearData = (fileHandler) => async () => {
  const { clearStorage, paths } = fileHandler();
  const { studentsWritePath } = paths;
  const isAGo = confirmClearPrompt();

  if (isAGo) clearStorage(studentsWritePath);
  else console.warn(`Operation ABORTED.  Storage was not reset.`);
};
