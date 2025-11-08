/**
 * 배열의 길이를 반환한다.
 * @param T 배열
 * @returns 배열의 길이
 */
type Length<T extends any[]> = T["length"];

export default Length;