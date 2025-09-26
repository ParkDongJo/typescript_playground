type flatten = FlattenArray<[1, 2, [3, 4], [[5]]]>;

type FlattenArray<T extends unknown[]> = T extends [infer U, ...infer Rest]
  ? U extends unknown[]
    ? [...FlattenArray<U>, ...FlattenArray<Rest>]
    : [U, ...FlattenArray<Rest>]
  : T;

type test = FlattenArray<[1, 2]>;
type test2 = FlattenArray<[1, 2, [3, 4], [[5]]]>;
type test3 = FlattenArray<[1]>;
type test4 = FlattenArray<[[[[[5]]]]]>;
type test5 = FlattenArray<[1, [2, [3, [4, [5]]]]]>;
