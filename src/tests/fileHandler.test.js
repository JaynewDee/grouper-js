import { FileHandler } from "../lib/fs";

describe("File system module factory", () => {
  test("should instantiate object of appropriate shape", () => {
    const testInstance = FileHandler();
    const testWithArg = FileHandler({});
    expect(testInstance.source).toEqual({});
  });
});

/* 
export const FileHandler = (source = {}) => ({
  source,
  ext: Object.entries(source).length
    ? source.match(new RegExp(/\.(csv|json)/))[0]
    : "",
  absolute: getAbsolutePath(source),
  tempDir: os.tmpdir(),
  readFlow,
  toJsonFlow,
  initStorage: async (pathToTemp) =>
    await mkdir(pathToTemp, { recursive: true })
}); */
