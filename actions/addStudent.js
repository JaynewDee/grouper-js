const { red, green, yellow } = require("chalk");
const Student = require("../data/Student");
const addStudent = (studentList) => (setter) => (student) =>
  studentList
    ? setter([...studentList, Student(...student)])
    : setter([Student(...student)]);

module.exports = addStudent;
