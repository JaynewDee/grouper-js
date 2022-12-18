import { set, get, remove, clear } from "store2";

export const LocalStore = (cache = {}) => ({
  cache,
  set,
  get,
  remove,
  clear
});
