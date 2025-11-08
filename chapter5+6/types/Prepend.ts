/**
 * 배열의 앞에 요소를 추가한다.
 * @param ARR 배열
 * @param T 추가할 요소
 * @returns 추가된 배열
 */

type Prepend<ARR extends unknown[], T> = [T, ...ARR];

export default Prepend;