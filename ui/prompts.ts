interface Answers {
  name: string;
  avg: number;
  group: boolean;
  groupNum?: string;
  fileExists?: boolean;
  confirmClear?: boolean;
}

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
    when: ({ group }: Answers) => group === true
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
    when: ({ fileExists }: Answers) => fileExists
  }
];

const getFileToClear = [
  {
    type: "list",
    name: "fileToClear",
    message: "Which file do you wish to empty?",
    choices: ["students", "groups"]
  }
];

const confirmClear = [
  {
    type: "confirm",
    name: "confirmClear",
    message: "Are you sure you want to clear the specified data?"
  },
  {
    type: "confirm",
    name: "confirmClearAgain",
    message: "Your file will be unrecoverable ... Continue?",
    when: ({ confirmClear }: Answers) => confirmClear
  }
];

export { addStudent, fileConflict, getFileToClear, confirmClear };
