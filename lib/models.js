import { nanoid } from "nanoid";

export const Student = (name, avg, group = -1) => ({
  id: nanoid(),
  name,
  avg: parseFloat(avg),
  group: String(group),
  added: new Date()
});
