

// 문제로 내기
// type FormatKeys<T extends string> = T extends `${infer _Start}{${infer Param}}${infer Rest}`
//   ? Param | FormatKeys<Rest>
//   : never;

// 문제 풀기
// type Test = FormatKeys<'{a}{b}{c}'>;

// 재귀 조건부 형식
type FormatKeys<T extends string> = T extends `${string}{${infer Param}}${infer Rest}`
  ? Param | FormatKeys<Rest>
  : never;

type Test = FormatKeys<'Hello {World} I am {Name}'>;


function format<T extends string, K extends Record<FormatKeys<T>, string>>(
  fmtString: T,
  params: K
): string {
  let ret: string = fmtString;
  for (let k in params) {
    ret = ret.replaceAll(`{${k}}`, params[k as keyof typeof params]);
  }
  return ret;
}

const result = format('Hello {name} I am {age}', {
  name: 'John',
  age: '30',
});
