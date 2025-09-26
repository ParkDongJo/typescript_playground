
export type FlattenObjectKeys1<
  T extends Record<string, unknown>,
  Key = keyof T,
> = Key extends string
  ? T[Key] extends Record<string, unknown>
    ? `${Key}.${FlattenObjectKeys1<T[Key]>}`
    : `${Key}`
  : never;

/*
위 타입 정의는 

{ a?: { b: string }, c: string } 를 a | c 로만 잡고 있어

나는 위 경우도 a.b | c 로 잡게끔 하고 싶어
수정해줘
*/
export type FlattenObjectKeys<
  T extends Record<string, unknown>,
  Key = keyof T,
> = Key extends string
  ? T[Key] extends Record<string, unknown> | undefined
    ? `${Key}.${FlattenObjectKeys<NonNullable<T[Key]>>}`
    : `${Key}`
  : never;

// 