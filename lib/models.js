import { nanoid } from "nanoid";

export const Student = (name, avg, group = -1) => ({
  name,
  avg,
  group: String(group)
});
