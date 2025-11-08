/**
 * 타입 캐스팅
 * T2가 T1을 포함하고 있다면 T1을 반환하고, 그렇지 않다면 T2를 반환한다.
 * @param T1 캐스팅할 타입
 * @param T2 캐스팅할 타입 (T1을 T2로 캐스팅)
 * @returns 캐스팅된 타입
 */

type Cast<T1, T2> = T1 extends T2 ? T1 : T2;

export default Cast;