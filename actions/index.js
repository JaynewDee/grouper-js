const Conf = require("../data/index");

const Store = Conf();

const addStudent = require("./addStudent");
const listPassing = require("./listPassing");

Store.deleteList();
module.exports = {
  listPassing: listPassing(Store.getStudents()),
  addStudent: addStudent(Store.getStudents())(Store.setStudents)
};
