// const jsonbase = require("jsonbase.com");

// const TOKEN =
//   process.env.JSON_BASE ||
//   `l;jgj342]654;ou[h23l4kj/5jgjhflj'kh363;]lk3j45;akndf['mvglkjtgsauyqwejr`;

// const jsonStore = jsonbase(TOKEN);

// const Store = (store, cache = []) => ({
//   cache,
//   store,
//   getStudents: async () =>
//     cache === [] ? (cache = await store.read("student")) : cache,
//   addStudent: async (newStudent) => await store.write("student", newStudent)
// });

// const studentStore = Store(jsonStore);

// (async () => {
//   // await studentStore.addStudent({ name: "Joshua", avg: 100 });
//   const students = await studentStore.getStudents();
//   console.log(students);
// })();

// const optionsSchema = {
//   output: {
//     type: "string",
//     maximum: 3
//   }
// };

// const config = new (require("conf"))({ optionsSchema });

// const Conf = (config) => () => ({
//   config,
//   deleteList: () => config.delete("student-list"),
//   getStudents: () => config.get("student-list"),
//   setStudents: (newArray) => config.set("student-list", newArray)
// });

// module.exports = Conf(config);
