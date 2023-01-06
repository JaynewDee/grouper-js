import { Student } from "../lib/models";

describe("Student constructor", () => {
  test("should instantiate object of appropriate shape", () => {
    const test = { name: "Joshua", avg: 100 };
    const { id, name, avg, group, added } = Student(test.name, test.avg);
    expect(typeof id && typeof name).toBe("string");
    expect(typeof avg && typeof group).toBe("number");
    expect(added instanceof Date).toBe(true);
    expect(name).toBe("Joshua");
    expect(avg).toBe(100);
  });
});
