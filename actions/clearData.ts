/**
 * @module actions/clearData
 */
import { FHType } from "../lib/fs.js";
import { fileClearPrompt, confirmClearPrompt } from "../ui/index.js";

export const clearData = (fileHandler: FHType) => async () => {
  const { clearStorage, paths } = fileHandler();
  const { studentsWritePath, groupsWritePath } = paths;
  const { fileToClear } = await fileClearPrompt();
  const isAGo = await confirmClearPrompt();

  const clearSwitch = (collectionName: string) => {
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

  if (isAGo) {
    clearSwitch(fileToClear);
    console.log(`${fileToClear.toUpperCase()} collection emptied.`);
    return;
  }

  console.warn(`Operation ABORTED.  Storage was not reset.`);
};