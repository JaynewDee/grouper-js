/**
 * @module actions/clearData
 */
import { fileClearPrompt, confirmClearPrompt } from "../ui/index.js";

export const clearData = (fileHandler) => async () => {
  const { clearStorage, paths } = fileHandler();
  const { studentsWritePath, groupsWritePath } = paths;
  const { fileToClear } = await fileClearPrompt();
  const isAGo = await confirmClearPrompt();

  const clearSwitch = (collectionName) => {
    switch (collectionName) {
      case "students":
        clearStorage(studentsWritePath);
        break;
      case "groups":
        clearStorage(groupsWritePath);
        break;
      default:
        console.log(`Input invalid!`);
        break;
    }
  };

  if (isAGo.confirmClearAgain) {
    return clearSwitch(fileToClear);
  }

  console.warn(`Operation ABORTED.  Storage was not reset.`);
};
