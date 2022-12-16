const addStudent = [
  {
    type: "input",
    name: "name",
    message: "Student's name: "
  },
  {
    type: "number",
    name: "avg",
    message: "Student's GPA: "
  },
  {
    type: "confirm",
    name: "group",
    message: "Assign student to a group?"
  },
  {
    type: "number",
    name: "groupNum",
    message: "Insert group # to assign student: ",
    when: (ans) => ans.group === true
  }
];

export { addStudent };
