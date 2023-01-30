import { Student } from "../lib/models.js";
import { should, expect } from "chai";
should();
expect();

describe("Student constructor", () => {
  it("should instantiate object of appropriate shape", () => {
    const test = { name: "Joshua", avg: 100 };
    const { name, avg, group } = Student(test.name, test.avg);

    (typeof id && typeof name).should.equal("string");
    (typeof avg && typeof group).should.equal("string");
    name.should.equal("Joshua");
    avg.should.equal(100);
  });
});
