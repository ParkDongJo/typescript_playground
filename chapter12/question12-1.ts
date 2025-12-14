// 우리가 지금까지 공부한 모든 내용을 활용해서 객체를 합치는 MergeAll 이라는 유틸 함수를 만들어 봅시다.
// 객체를 합치는 MergeAll 이라는 유틸 함수를 만들어 봅시다.

// 재귀, 조건부, infer, 제네릭 등등을 활용해봅시다.

type Foo = { a: 1; b: 2 }
type Bar = { a: 2 }
type Baz = { c: 3 }

// 기대값 : { a: 1 | 2; b: 2; c: 3 }
type Result = MergeAll<[Foo, Bar, Baz]>

// 정답
type MergeAll<XS extends object[], Res = {}> = 
XS extends [infer L, ...infer R extends object[]]
  ? MergeAll<R, Omit<Res, keyof L> & { 
      [p in keyof L]: p extends keyof Res ? L[p] | Res[p] : L[p] 
    }>
  : Omit<Res, never>;