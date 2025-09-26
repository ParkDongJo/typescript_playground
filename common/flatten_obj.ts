

type Obj = {
  a: string;
  b: {
    c: number;
    d: string;
  }
}

// 결과
// {
//   a: string;
//   c: number;
//   d: string;
// }
type Primitives = number | string | boolean | undefined | null | bigint;

// type FlatKeys<T extends Record<string | number, any>> = FlatKeys1<T, keyof T>
type FlatKeys<T, K extends keyof T> = K extends string
  ? T[K] extends Primitives
    ? `${K}`
    : `${K}.${FlatKeys<T[K], keyof T[K]>}`
  : never;

type WithBase<B extends string, K extends string> = B extends ``
  ? K
  : `${B}.${K}`;
type FlatValue<
  T,
  K extends string,
  BASE extends string = ""
> = K extends `${infer PRE}.${infer POST}`
  ? WithBase<BASE, PRE> extends keyof T
    ? FlatValue<T[WithBase<BASE, PRE>], POST>
    : FlatValue<T, POST, WithBase<BASE, PRE>>
  : WithBase<BASE, K> extends keyof T
  ? T[WithBase<BASE, K>]
  : never;

type Flatten<T> = {
  [K in FlatKeys<T, keyof T>]: FlatValue<T, K>;
};

type Result = Flatten<Obj>

const test: Result = {
  a: 'a',
  'b.c': 1,
  'b.d': 'd'
}

//https://velog.io/@egoavara/flatten-%EC%98%A4%EB%B8%8C%EC%A0%9D%ED%8A%B8-%ED%83%80%EC%9E%85-%EC%B6%94%EB%A1%A0
