export const exportHandler = (fileHandler) => (input, options) => {
  const { convertJsonToCsv } = fileHandler();
  const { type } = options;
};
