import { FileHandler } from "../lib/fs";

describe("File system module factory", () => {
  test("should instantiate object of appropriate shape", () => {
    const testInstance = FileHandler();
    const testWithArg = FileHandler({});
    expect(testInstance.source).toEqual({});
  });
});
