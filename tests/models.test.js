import { Student } from "../lib/models";

describe("Student constructor", () => {
  test("should instantiate object of appropriate shape", () => {
    const test = { name: "Joshua", avg: 100 };
    const { name, avg, group } = Student(test.name, test.avg);
    expect(typeof id && typeof name).toBe("string");
    expect(typeof avg && typeof group).toBe("string");
    expect(name).toBe("Joshua");
    expect(avg).toBe(100);
  });
});
