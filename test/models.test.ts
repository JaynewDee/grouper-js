import { Student } from "../lib/models.js";
import { should } from "chai";
should();

describe("Student constructor", () => {
  it("should return entity of appropriate shape", () => {
    const test = { name: "Joshua", avg: 100 };
    const { name, avg, group } = Student(test.name, test.avg, "0");

    (typeof name).should.equal("string");
    (typeof avg && typeof group).should.equal("string");
    name.should.equal("Joshua");
    avg.should.equal(100);
  });
});
