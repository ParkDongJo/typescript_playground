
/*
  Absolute type은 숫자 타입을 받아서 양수 타입으로 변환하는 타입입니다.
  예시: Absolute<100> -> "100"
  Absolute<-100> -> "100"
  Absolute<"100"> -> "100"
  Absolute<"-100"> -> "100"
*/

type TestNum = -100
type Absolute = any;
type Result = Absolute<TestNum>

// 정답
// type Absolute<T extends string | number> = `${T}` extends `-${infer U}` ? U : `${T}`;
