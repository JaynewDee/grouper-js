import { nanoid } from "nanoid";

export const Student = (name, avg, group = -1) => ({
  id: nanoid(),
  name,
  avg,
  group,
  added: new Date(),
  colorCode:
    avg <= 100 && avg >= 90
      ? "green"
      : avg >= 80
      ? "blue"
      : avg >= 70
      ? "yellow"
      : "red"
});
