import { FileHandler } from "../lib/fs.js";
import { PathResolver } from "../lib/path.js";
import { should } from "chai";
should();

describe("File system module factory", () => {
  it("should return entity of appropriate shape", () => {
    const testInstance = FileHandler({});
    Object.entries(testInstance).length.should.equal(6);
  });
});

describe("Path Resolver", () => {
  it("should return entity of appropriate shape", () => {
    const testResolver = PathResolver("test.csv");
    Object.entries(testResolver).length.should.equal(4);

    Object.values(testResolver).forEach((val) => {
      (typeof val).should.equal("string");
    });
  });
});

describe("File Parser", () => {
  it("should return entity of appropriate shape", () => {});
});
