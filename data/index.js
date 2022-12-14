const optionsSchema = {
  output: {
    type: "string",
    maximum: 3
  }
};

const config = new (require("conf"))({ optionsSchema });

const Conf = (config) => () => ({
  config,
  deleteList: () => config.delete("student-list"),
  getStudents: () => config.get("student-list"),
  setStudents: (newArray) => config.set("student-list", newArray)
});

module.exports = Conf(config);
