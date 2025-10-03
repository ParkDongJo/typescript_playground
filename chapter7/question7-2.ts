/*
  lodash.js 라는 함수형 프로그래밍 라이브러리에 있는 difference 함수를 구현해봅시다.

  difference 함수의 사용법은 아래와 같습니다.

  ```typescript
  const difference = (array: readonly unknown[], values: readonly unknown[]) => {
    return array.filter(item => !values.includes(item));
  };

  const result = difference([1, 2, 3, 4, 5], [2, 4]);
  console.log(result); // [1, 3, 5]
  ```

  difference 함수를 구현한다면 아래와 같습니다.
  ```typescript
  function difference<
    T extends unknown[],
    U extends unknown[]
  >(
    left: T,
    right: U
  ): Difference<T, U> {
    return left.filter(item => !right.includes(item)) as Difference<T, U>;
  }
  ```

  위 함수의 리턴 타입으로 사용된 Difference 유틸 타입을 직접 구현해 봅시다.

  [고려사항]
  - any의 사용범위는 작성자의 판단에 맡깁니다. (unknown 대신 any로 대체하셔도 좋습니다.)
  - Difference 유틸 타입의 테스트 케이스는 아래와 같습니다. 아래 사항을 만족해 주세요
  ```typescript
  type D1 = Difference<[1, 2, 3], [2]>; // [1, 3]
  type D2 = Difference<['a', 'b', 'c'], ['a', 'c', 'd']>; // ['b']
  type D3 = Difference<[{ x: 1 }], [{ x: 1 }]>; // [{ x: 1 }] -> 객체 비교는 참조 비교라 같지 않음
  ```

*/

// 값 비교 (기본 구현)
type Equal<X, Y> = X extends Y
    ? (Y extends X ? true : false)
    : false;

type Includes<Arr extends readonly unknown[], Value> = 
  Arr extends [infer First, ...infer Rest]
    ? Equal<First, Value> extends true
      ? true
      : Includes<Rest, Value>
    : false;

// 차집합
type MyDifference<Left extends unknown[], Right extends unknown[]> = 
  Left extends [infer First, ...infer Rest]
    ? Includes<Right, First> extends true
      ? Difference<Rest, Right> // 제거
      : [First, ...Difference<Rest, Right>] // 유지
    : [];

type MyD1 = MyDifference<[1, 2, 3], [2]>; // [1, 3]
type MyD2 = MyDifference<['a', 'b', 'c'], ['a', 'c', 'd']>; // ['b']
type MyD3 = MyDifference<[{ x: 1 }], [{ x: 1 }]>; // [{ x: 1 }] (참조 비교라 같지 않음)

function difference<
  T extends unknown[],
  U extends unknown[]
>(
  left: T,
  right: U
): Difference<T, U> {
  return left.filter(item => !right.includes(item)) as Difference<T, U>;
}

// ✅ 테스트
const differenceNumberic = difference([2, 1], [2, 3]);
console.log(differenceNumberic); // [1]

const differenceString = difference(['a', 'b', 'c'], ['a', 'c', 'd']);
console.log(differenceString); // ['b']

const differenceObject = difference([{ x: 1, y: 1 }, { x: 1, y: 2 }], [{ x: 1, y: 1 }]);
console.log(differenceObject); // 둘 다 남음: 객체는 참조 비교라 동일하지 않음