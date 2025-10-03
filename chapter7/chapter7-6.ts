/*
  Rest['length'] 기법을 배움
*/

const commandItems = [
  'echo',
  'cat',
  'ls',
  'pwd',
  'cd',
  'exit',
  'help',
  'clear',
  'cls',
  'history',
] as const;

type TupleToUnion<T extends readonly string[]> = T extends readonly [
  ...infer Rest extends string[],
  infer Key extends string,
]
  ? { key: Key, value: Rest['length'] } | TupleToUnion<Rest>
  : never;

type Enum<T extends readonly string[], N extends boolean = false> = Readonly<{
  [K in TupleToUnion<T> as Capitalize<K['key']>]: N extends true 
    ? K['value'] 
    : K['key'];
}>;

type Command = Enum<typeof commandItems>;


function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function createEnum<T extends readonly string[], N extends boolean = false>(
  arr: T, 
  numberic?: N
): Enum<T, N> {
  let obj: any = {}
  for (let [i, el] of arr.entries()) {
    obj[capitalize(el)] = numberic ? i : el;
  }
  return obj;
}

const commandString = createEnum(commandItems);
const commandNumber = createEnum(commandItems, true);



