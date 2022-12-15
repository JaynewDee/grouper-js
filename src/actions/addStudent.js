import { Student } from "../lib/index.js";

export const addStudent = (studentList) => (setter) => (student) =>
  studentList
    ? setter([...studentList, Student(...student)])
    : setter([Student(...student)]);
