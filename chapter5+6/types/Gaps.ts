import type Cast from "./Cast";

/**
 * 배열의 빈 값을 제거한다.
 * 예시: CleanGaps<[1, 2, 3, null, undefined, 4]> -> [1, 2, 3, 4]
 * @param O 배열
 * @returns 빈 값을 제거한 배열
 */
type CleanGaps<O extends any[]> = {
  [K in keyof O]: NonNullable<O[K]>;
};


/**
 * 배열의 빈 값을 제거한다.
 * 예시: Gaps<[1, 2, 3, null, undefined, 4]> -> [1, 2, 3, 4]
 * Cast를 통해서 빈 값을 제거한 배열을 반환한다.
 * CleanGaps만 하지 않고, Cast를 한번 더 통해서 any[] 타입으로 반환한다.
 * @param L 배열
 * @returns 빈 값을 제거한 배열
 */
type Gaps<L extends any[]> = Cast<CleanGaps<{ [K in keyof L]?: L[K] }>, any[]>;

export default Gaps;
