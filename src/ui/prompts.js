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

const fileConflict = [
  {
    type: "list",
    name: "fileExists",
    message: "A file by that name already exists at this location.",
    choices: ["Abort", "Rename New", "Overwrite Current"]
  },
  {
    type: "input",
    name: "fileRename",
    message: "Enter a new name for the file: ",
    when: (ans) => ans.fileExists
  }
];

export { addStudent, fileConflict };
