export const Student = (name, avg) => ({
  name,
  avg,
  added: new Date().toLocaleDateString()
});
