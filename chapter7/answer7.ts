
// // lhc0506님 코드
// // 1번 문제
// //////////////////////////////////////////////////////////////////////////////////////////
// type PrimitiveArg = string | number | boolean;

// type PartialRight<
//   F extends (...args: any[]) => any, // F는 어떤 함수든 가능
//   A extends PrimitiveArg[] // A는 string, number, boolean 요소로 이루어진 읽기 전용 배열
// > = Parameters<F> extends [...infer RestParams, ...A] // F의 매개변수 목록(Parameters<F>)이 RestParams 뒤에 A가 오는 형태와 호환되는가?
//   ? (...args: RestParams) => ReturnType<F> // 호환된다면, RestParams를 인수로 받고 F의 반환 타입을 반환하는 함수 타입
//   : never; // 호환되지 않으면  never 타입 반환

// //   partialRight 함수에 이 PartialRight 유틸 타입을 적용해봅시다.

// function partialRight<
//   A extends PrimitiveArg[],
//   // F는 (...args: [...any[], ...A]) => any 형태여야 함을 명시하여,
//   // F의 매개변수 끝 부분이 A와 호환됨을 컴파일 타임에 강제
//   F extends (...args: [...any[], ...A]) => any
// >(
//   fn: F,
//   args: A // 타입 A를 그대로 사용
// ): PartialRight<F, A> {
//  return ((.



// // 정화님 코드
// // 1번 문제
// //////////////////////////////////////////////////////////////////////////////////////////
// /*1. partialRight 함수 구현/

// // partialRight: 함수의 오른쪽 인자들을 고정하여, 나머지 인자만 받는 새로운 함수 타입을 생성
// type PartialRight<
//   Fn extends (...args: any) => any,          // Fn: 전체 인자를 받는 원본 함수
//   RightArgs extends any[]                    // RightArgs: 미리 고정할 오른쪽 인자들의 튜플
// =
//   Fn extends (...args: [...infer LeftArgs, ...RightArgs]) => infer R
//     // Fn의 인자를 [왼쪽 인자들..., 고정할 오른쪽 인자들...] 형태로 분해하고,
//     // 리턴 타입 R을 추론함
//     ? (...args: LeftArgs) => R              // 나중에 받을 인자는 LeftArgs이며, 리턴 타입은 R인 새 함수 타입을 생성
//     : never;                                // 조건이 맞지 않으면 never


// //js 형태의 함수
// // function partialRight(fn, args) {
// //   return (...rest) => fn(...rest, ...args);
// // }
// */

// //함수와 오른쪽 인자를 받아서 , 왼쪽인자를 받아 (왼쪽+오른쪽인자 ) 넣어서 호출하는 함수 생성
// function partialRight<Fn extends (...args: any) => any, RightArgs extends any[]>(
//   fn: Fn, //1. 함수와
//   rightArgs: RightArgs //2. 오른쪽인자를 받아서
// ): PartialRight<Fn, RightArgs> { //함수의 오른쪽 인자를 고정하여 나머지인자만 받는 PartialRight 타입 반환
//   return ((...leftArgs: any[]) => fn(...leftArgs, ...rightArgs)) as any; //왼쪽인자를 받아서 fn호출시 (왼쪽인자, partialRight호출시 받은 오른쪽인자) 넣어서 호출
//  }


//  // 2번 문제
// //////////////////////////////////////////////////////////////////////////////////////////
// /** 2.  Difference 유틸 타입을 구현 */

// function difference<T extends unknown[], U extends unknown[]>(
//   left: T,
//   right: U
// ): Difference<T, U> {
//   return left.filter(item => !right.includes(item)) as Difference<T, U>;
// }


// type Difference<T extends any[], U extends any[]> =
//   T extends [infer Head, ...infer Tail] //T를 하나씩 잘라서 [Head, Tail] 형태로 봄
//     ? Head extends U[number] //Head가 U의 인자들 중에 있으면
//       ? Difference<Tail, U>  //Head를 제외한 Tail을 앞에 넣고 Difference호출
//       : [Head, ...Difference<Tail, U>] //Head가 U의 인자들 중에 없으면 배열에 Head 넣고 재귀호출
//     : []; //T extends [infer Head, ...infer Tail] 이 성립하지 않으면= 더이상 분해할것이 없으면(Tail이 빈배이면) 빈배열 빈환


// // Difference<[1, 2], [2]> =
// // 1이 [2] 안에 있는지 확인 → 없음 => 포함하고 나머지 비교
// // [1, ...Difference<[2], [2]>]

// // Difference<[2], [2]> = 
// // 2가 [2] 안에 있는지 확인 →  있음 => 제외하고 나머지 비교
// // Difference<[], [2]> = []   // [infer Head, ...infer Tail] 이 성립하지 않음 => [] 반환
// // [1, ...[]] = [1]



// // JopopScript님 코드
// // 1번 문제
// //////////////////////////////////////////////////////////////////////////////////////////
// function partialRight(
//   fn: (...parialArgs: string[]) => string,
//   args: (number | string | boolean)[]
// ): (input: string) => string {
//   const strArgs = args.map(it => it.toString())
//   return ((...rest: string[]) => fn(...rest, ...strArgs));
// }

// // 2번 문제
// //////////////////////////////////////////////////////////////////////////////////////////
// type ToTuple<T extends readonly unknown[]> =
// T extends [infer F, ...infer Rest]
//   ? [F, ...ToTuple<Rest>]
//   : [];
// type test1 = ToTuple<[1, 'a', true]> // [1, "a", true]

// type TupleUnion<T extends readonly unknown[]> =
// T extends [infer F, ...infer Rest]
//   ? F | TupleUnion<Rest>
//   : never;
// type test2 = TupleUnion<[1, 'a', true]> // true | 1 | "a"

// type DifferenceTuple<T extends readonly unknown[], U extends readonly unknown[]> =
// T extends [infer F, ...infer Rest]
//   // 요소가 1개이상 = F
//   ? F extends TupleUnion<U>
//     ? DifferenceTuple<Rest, U>
//     : [F, ...DifferenceTuple<Rest, U>]
//   // 한개도 없음
//   : [];
// type Difference<T extends readonly unknown[], U extends readonly unknown[]> = DifferenceTuple<ToTuple<T>, ToTuple<U>>

// type D1 = Difference<[1, 2, 3], [2]>; // [1, 3]
// type D2 = Difference<['a', 'b', 'c'], ['a', 'c', 'd']>; // ['b']
// type D3 = Difference<[{ x: 1 }], [{ x: 1 }]>; // [{ x: 1 }] -> 객체 비교는 참조 비교라 같지 않음
// // TODO 실패 []타입으로 추론됨

// function difference<
// T extends readonly unknown[],
// U extends readonly unknown[]
// >(
//   left: T,
//   right: U
// ): Difference<T, U> {
//   return left.filter(item => !right.includes(item)) as unknown as Difference<T, U>;
// }

// // TODO 실패 []타입으로 추론됨
// const result = difference([1, 2, 3, 4, 5], [2, 4]);
// console.log(result); // [1, 3, 5]



// // 찰쓰님 코드
// // 1번 문제
// type PartialRight<
//   Fn extends (...args: any[]) => any,
//   Partials extends any[]
// > = Fn extends (...args: [...infer Rest, ...Partials]) => infer R
//   ? (...args: Rest) => R
//   : never;

// function partialRight<
//   Fn extends (...args: any[]) => any,
//   Partials extends any[]
// >(
//   fn: Fn,
//   args: readonly [...Partials]  // 핵심 수정
// ): PartialRight<Fn, Partials> {
//   return ((...rest: any[]) => fn(...rest, ...args)) as any;
// }

// // 2번 문제
// // ai 도움을 받아서, 간소화 하고, 분리시킴
// //////////////////////////////////////////////////////////////////////////////////////////
// type Equal<X, Y> = X extends Y
//     ? (Y extends X ? true : false)
//     : false;

// type Includes<Arr extends readonly unknown[], Value> = 
//   Arr extends [infer First, ...infer Rest]
//     ? Equal<First, Value> extends true
//       ? true
//       : Includes<Rest, Value>
//     : false;

// // 차집합
// type Difference<Left extends unknown[], Right extends unknown[]> = 
//   Left extends [infer First, ...infer Rest]
//     ? Includes<Right, First> extends true
//       ? Difference<Rest, Right> // 제거
//       : [First, ...Difference<Rest, Right>] // 유지
//     : [];