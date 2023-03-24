import { FHType, Input } from "../lib/fs";
import { ParserData } from "../lib/parse";

export const exportHandler = (fileHandler: FHType) => async (input: Input) => {
  const { parser, readFlowJson, exportAsCsv, paths } = fileHandler();

  const { studentsWritePath, groupsWritePath } = paths;
  const { fileType, collectionType } = input;

  if (collectionType === "students") {
    if (fileType === "csv") {
      try {
        const fromBuffer: string = readFlowJson(studentsWritePath).toString();
        const tempData = JSON.parse(fromBuffer);
        const csv = await parser("formattedJson", tempData)("");
        await exportAsCsv("./students.csv", csv);
      } catch (err) {
        console.error(err);
      }
    }
  } else if (collectionType === "groups") {
    try {
      const fromBuffer: string = readFlowJson(groupsWritePath).toString();
      const tempData = JSON.parse(fromBuffer);
      const classArr: any = Object.values(tempData).reduce(
        (acc: any[], val: any) => [...acc, ...val],
        []
      );
      const csv = await parser("groupsJson", classArr)("");
      await exportAsCsv("./groups.csv", csv);
    } catch (err) {
      console.error(err);
    }
  }
};
