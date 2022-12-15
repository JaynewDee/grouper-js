import { nanoid } from "nanoid";

export const Student = (name, avg) => ({
  id: nanoid(),
  name,
  avg,
  added: new Date().toLocaleDateString()
});
