import { FileHandler } from "../lib/fs";
import { PathResolver } from "../lib/path";

describe("File system module factory", () => {
  test("should return entity of appropriate shape", () => {
    const testInstance = FileHandler();
    expect(Object.entries(testInstance).length).toBe(6);
  });
});

describe("Path Resolver", () => {
  test("should return entity of appropriate shape", () => {
    const testResolver = PathResolver("test.csv");
    expect(Object.entries(testResolver).length).toBe(4);
    const values = Object.values(testResolver);
    values.forEach((val) => {
      expect(typeof val).toBe("string");
    });
  });
});
