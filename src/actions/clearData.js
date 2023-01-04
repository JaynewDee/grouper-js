/**
 * @module actions
 */
import { confirmClearPrompt } from "../ui/index.js";

export const clearData = (fileHandler) => async () => {
  const { clearStorage, tempDir, tempDefault } = fileHandler();

  const isAGo = confirmClearPrompt();

  if (isAGo) clearStorage(tempDir + tempDefault);
  else console.warn(`Operation ABORTED.  Storage was not reset.`);
};
