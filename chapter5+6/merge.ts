import type Merge from "./types/Merge";

const merge = <T extends object, U extends object>(a: T, b: U): Merge<T, U> => {
  return { ...a, ...b };
};

export default merge;
