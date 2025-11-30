
/**
문제:
문자열을 객체 형식으로 변환하는 타입을 작성하세요.

예시:
입력: "{ a: string; b: number; }"
출력: { a: string } & { b: number }

 */
type Reust = ParseObject<'{ a: string; b: number; }'>;


// 정답
// type ParseObjectTest = ParseObject<{ a: string; b: string; }>;
type ParseObject<T extends string> = T extends `${string} ${infer Key}: ${infer Type};${infer Rest}`
  ? { [k in Key]: MapFormatType[Type] } & ParseObject<Rest>
  : {};


type ParseObjectTest = ParseObject<'a: string; b: number;'>;
type ParseObjectTest2 = ParseObject<'{ a: string; b: number; }}'>;

const tempObj: ParseObjectTest = {
  a: 'string',
  b: 123,
}
