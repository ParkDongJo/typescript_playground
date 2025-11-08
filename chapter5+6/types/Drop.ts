import type Length from "./Length";
import type Prepend from "./Prepend";
import type Tail from "./Tail";


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