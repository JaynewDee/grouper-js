const matchExt = new RegExp(/\.\w{1,4}/);
const handleImport = (str, options) => {
  if (options.file) {
    const extension = str.match(matchExt);
    console.log(extension);
  }
};

const testOptions = {
  file: "students.csv"
};
