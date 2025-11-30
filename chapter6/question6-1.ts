
/**
문제:
문자열을 객체 형식으로 변환하는 타입 ParseObject을 완성해주세요.

예시:
입력: "{ a: string; b: number; }"
출력: { a: string } & { b: number }

 */
type Reust = ParseObject<'{ a: string; b: number; }'>;

// 아래 테스트 케이스를 통과시켜주세요.
type Test_6_1_1 = ParseObject<'{ a: string; b: number; }'>; 
// { a: string } & { b: number }
type Test_6_1_2 = ParseObject<'{ a: string; b: number; c: boolean; }'>; 
// { a: string } & { b: number } & { c: boolean }
type Test_6_1_3 = ParseObject<'{ a: string; b: number; c: boolean; d: {}; e: null; f: undefiend; g: never; h: ()=>any; }'>; 
// { a: string } & { b: number } & { c: boolean } & { d: {} } & { e: null } & { f: undefiend } & { g: never } & { h: ()=>any }

// 정답
// type ParseObjectTest = ParseObject<{ a: string; b: string; }>;
type MapFormatType = {
  string: string,
  number: number,
  boolean: boolean,
  null: null,
  undefiend: undefined,
  never: never,
  [x: string]: any
}


type ParseObject<T extends string> = T extends `${string} ${infer Key}: ${infer Type};${infer Rest}`
  ? { [k in Key]: MapFormatType[Type] } & ParseObject<Rest>
  : {};


type ParseObjectTest = ParseObject<'a: string; b: number;'>;
type ParseObjectTest2 = ParseObject<'{ a: string; b: number; }}'>;

const tempObj_6_1_1: Test_6_1_1 = {
  a: 'string',
  b: 123,
}
