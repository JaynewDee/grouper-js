export interface StudentType {
  name: string;
  avg: number;
  group: string;
}

export const Student = (
  name: string,
  avg: number,
  group: string
): StudentType => ({
  name,
  avg,
  group: String(group)
});
