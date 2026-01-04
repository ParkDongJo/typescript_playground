// 우리가 지금까지 공부한 모든 내용을 활용해서 객체를 합치는 MergeAll 이라는 유틸 함수를 만들어 봅시다.
// 객체를 합치는 MergeAll 이라는 유틸 함수를 만들어 봅시다.

// 재귀, 조건부, infer, 제네릭 등등을 활용해봅시다.

type Foo = { a: 1; b: 2; d: 4 }
type Bar = { a: 2 }
type Baz = { c: 3 }

// 기대값 : { a: 1 | 2; b: 2; d: 4; c: 3 }
type Result = MergeAll<[Foo, Bar, Baz]>

// 정답
type MergeAll<O extends object[], Result = {}> =
O extends [infer Left, ...infer Right extends object[]]
  ? MergeAll<Right, Omit<Result, keyof Left> & {
      [Key in keyof Left]: Key extends keyof Result ?
        Result[Key] | Left[Key] :
        Left[Key]
    }>
    // never는 절대 존재할 수 없는 타입이므로 실제로 제거할 키가 없습니다
    // 실제 목적: TypeScript가 복잡하게 중첩된 교차 타입(&)을 펼쳐서 보기 좋게 만들어줍니다
  : Omit<Result, never>;