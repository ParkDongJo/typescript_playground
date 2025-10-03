// 정해지지 않은 개수의 인수들을 받는다

type Adder = (a: number) => (b: number) => (c: number) => number;
type Adder2 = (a: number) => (b: number, c: number) => (d: number) => number;
type Adder3 = (a: number) => (b: number, c: number) => (d: number) => number;
type Adder4 = (a: number) => (b: number, c: number, d: number) => number;
type Adder5 = (a: number) => (b: number, c: number, d: number, e: number) => number;
// 위와 같이 Overload 해야하는 함수의 갯수가 늘어남


type Overloads<A extends unknown[]> = A extends [infer First, ...infer Rest]
  ? [First, ...Overloads<Rest>] | []
  : [];

// type Overloaded = [string, number] | [] | [string, number, string] | [string]
type Overloaded = Overloads<[string, number, string]>;
type Overloaded2 = Overloads<[]>;
type Overloaded3 = Overloads<[string]>;
type Overloaded4 = Overloads<[string, number]>;
type Overloaded5 = Overloads<[string, number, boolean]>;

/*
TypeScript의 타입 추론에서 사용되는 특별한 패턴입니다. 여기서 _는 관례적으로 "이 값에 관심이 없다" 또는 "이 값을 무시한다"라는 의미를 나타내는 변수명입니다.
*/
// _ 를 사용하면서, 재귀적으로 들어가니까 하나씩 제거되는 형태
// 단 아래의 TypeRemove 는 Left 가 더 배열 길이가 더 길어야한다
type Remove<Left extends unknown[], Right extends unknown[]> = Right extends [infer _, ...infer RightRest]
  ? Left extends [infer _, ...infer LeftRest]
    ? Remove<LeftRest, RightRest>
    : never
  : Left;

type Removed = Remove<[1, 2, 3, 4, 5], [2, 4]>;
type Removed2 = Remove<[1, 2, 3], [2, 4, 6, 8, 10]>;
type Removed3 = Remove<[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]>;


type CurriedV2<Args extends unknown[], Return extends unknown> = 
  Args extends [infer First, ...infer Rest]
    ? <Overloaded extends Overloads<Rest>>(
        arg: First,
        ...args: Overloaded
      ) => CurriedV2<Remove<Rest, Overloaded>, Return>
    : Return;

type CurriedV2Result = CurriedV2<[string, number, string], number>;

// 한번에 한개의 인수를 가짐  
function curryV2<Args extends unknown[], Return extends unknown>(fn: (...args: Args) => Return): CurriedV2<Args, Return> {
  // 형식의 유연함 때문에, any가 필요하다
  let curried: Function = (...args: Args) => {
    if (args.length !== fn.length) {
      return curried.bind(null, ...args);
    }
    return fn(...args);
  };
  return curried as CurriedV2<Args, Return>;
}

const addFour = (a: number, b: number, c: number, d: number) => a + b + c + d;

const curriedV2 = curryV2(addFour);

curriedV2(1)(2)(3, 4);
curriedV2(1, 2)(3, 4);
const c = curriedV2(1, 2, 3);








