// 재귀 한계

type Trim<T extends string> =
  T extends ` ${infer X}` ?
    Trim<X> :
    T extends `${infer X} ` ?
      Trim<X> :
      T;

type C5_Trimed = Trim<'   Hello World   '>;

type RemovedWithSpace<T extends string> = T extends `${infer A} ${infer B}`
  ? RemovedWithSpace<`${Uncapitalize<A>} ${Capitalize<B>}`>
  : T

type StringSplit<T extends string> = T extends `${infer Char}${infer Rest}`
  ? Capitalize<Char> | Uncapitalize<Char> | StringSplit<Rest>
  : never;

type Chars = StringSplit<"abcdefg">

 type CreateIdentifier<T extends string> = 
  RemovedWithSpace<T> extends `${infer A extends Chars}${infer Rest}`
    ? `${A}${CreateIdentifier<Rest>}`
    : RemovedWithSpace<T> extends `${infer A}${infer Rest}`
        ? CreateIdentifier<Rest>
        : T
