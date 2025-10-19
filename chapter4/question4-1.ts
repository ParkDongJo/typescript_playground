// 문제 설명:
// pairs 함수를 확장하여 다양한 타입의 쌍을 처리할 수 있는 함수를 구현하세요.
// any 를 사용하지 마세요

// 예시 사용:
// 아래 코드가 타입 체크를 통과하도록 pairs 함수를 구현하세요
const pair1 = pairs(1, 'a'); // [number, string]
const pair2 = pairs(true, 42, 'hello'); // [boolean, number, string]
const pair3 = pairs('a', 1, true, null); // [string, number, boolean, null]

