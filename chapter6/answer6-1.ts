// 정답

// 정화님


// JopopScript님
type MapFormatType = {
  string: string,
  number: number,
  boolean: boolean,
  null: null,
  undefiend: undefined,
  never: never,

  // 이건 잘 처리 못하겠네요...
  // object: object,
  // '{}': object,
  // fn: function
  [x: string]: any
}

type ParseObject<T extends string> = T extends `{ ${infer K}: ${infer V};${infer Rest} }`
  ? { [KK in K]: MapFormatType[V] } & ParseRestObject<Rest>
  : {};

type ParseRestObject<T extends string> = T extends ` ${infer Key}: ${infer V};${infer Rest}`
  ? { [K in Key]: MapFormatType[V] } & ParseRestObject<Rest>
  : {};

type Roll<T> = {
  [K in keyof T]: T[K]
} & {}


// 시작값     '{ a: string; b: number; c: boolean; }'
// 첫번째 루프 ' b: number; c: boolean;'
// 두번째 루프 ' c: boolean;'
type Reust = Roll<ParseObject<'{ a: string; b: number; c: boolean; d: {}; e: null; f: undefiend; g: never; h: ()=>any; }'>>;