// 정답

// 정화님
type PascalCaseRecurse<S extends string> =
  S extends `${infer Word} ${infer Rest}`
    ? `${Capitalize<Word>}_${PascalCaseRecurse<Rest>}`
    : Capitalize<S>;

type 정화님 = PascalCaseRecurse<'hello world typescript'>;


// JopopScript님
type PascelCaseWithUnderscore<T extends string> = T extends `${infer Word} ${infer Rest}`
    ? `${FirstCapitalize<Word>}_${WithWhiteSpace<Rest>}`
    : T extends `${infer W}`
        ? `${FirstCapitalize<W>}`
        : never;

type FirstCapitalize<T extends string> = T extends `${infer First}${infer Rest}`
    ? `${Capitalize<First>}${Rest}`
    : never;

type WithWhiteSpace<T extends string> = T extends ` ${infer Word}`
    ? `_${WithWhiteSpace<Word>}`
    : T extends `${infer Word}`
        ? `${PascelCaseWithUnderscore<Word>}`
        : never;


type Test1 = PascelCaseWithUnderscore<'hello world typescript'>; // "Hello_World_Typescript"
type Test2 = PascelCaseWithUnderscore<'this is a test'>; // "This_Is_A_Test"
type Test3 = PascelCaseWithUnderscore<'single'>; // "Single"
type Test4 = PascelCaseWithUnderscore<'hello  world'>; // "Hello__World"