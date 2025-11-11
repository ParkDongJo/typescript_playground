type Tail<T extends unknown[]> = T extends [any, ...infer U] ? U : [];

type Prepend<ARR extends unknown[], T> = [T, ...ARR];

type Length<T extends any[]> = T["length"];

/**
 * 배열의 첫 번째 요소를 제거한다.
 * @param N 제거할 요소의 개수
 * @param T 제거할 배열
 * @param I 제거된 요소를 저장할 배열
 * @returns 제거된 배열
 */
type Drop<N extends number, T extends any[], I extends any[] = []> = {
  0: Drop<N, Tail<T>, Prepend<I, any>>;
  1: T;
}[Length<I> extends N ? 1 : 0];

export default Drop;

type Result = Drop<2, [1, 2, 3, 4, 5]>;


// [문제]
// 위 타입을 보고 역으로 drop 함수를 구현해주세요.

// 공개 API: 2개 파라미터, I는 기본값 [] 사용
function drop<N extends number, T extends any[]>(n: N, array: T): Drop<N, T, []>;

// 내부 재귀용: 3개 파라미터
function drop<N extends number, T extends any[], I extends any[]>(
  n: N,
  array: T,
  counter: I
): Drop<N, T, I>;

// 실제 구현
function drop(n: number, array: any[], counter: any[] = []): Drop<number, any[], any[]> {
  if (counter.length >= n) {
    return array;
  }
  if (array.length === 0) {
    return [];
  }
  
  const [, ...tail] = array;
  return drop(n, tail, [...counter, 1]);
}

const result = drop(2, [1, 2, 3, 4, 5]);
const result2 = drop(3, [1, 2, 3, 4, 5]);

console.log(result);
console.log(result2);