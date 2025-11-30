// 책에 나오는 Remap 은 유니온 타입이 있을 때, 정상 동작을 하지 않음
// 그래서 아래와 같이 해야 감싸서 추론을 하는 것이 정상 동작
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;