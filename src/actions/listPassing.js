/**
 *
 * @param {Object[]} studentList
 * @returns
 */
export const listPassing = (studentList) => () =>
  studentList && studentList.length
    ? studentList.reduce((student) =>
        student.passing
          ? console.log(green(`${student.name} is passing`))
          : console.log(red.bold(`${student.name} is failing`))
      )
    : console.log(yellow(`No students found ...`));
