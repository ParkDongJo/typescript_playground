/**
문제:
다음과 같은 요구사항을 만족하는 TypeScript 타입을 작성하세요:
주어진 문자열에서 모든 공백을 제거하고
각 단어의 첫 글자를 대문자로 변환하며
단어 사이에 언더스코어()를 추가하는 타입을 구현하세요.

예시:
입력: "hello world typescript"
출력: "Hello_World_Typescript"

힌트:
- 재귀적 타입과 템플릿 리터럴 타입을 활용하세요
- Capitalize, Uncapitalize 유틸리티 타입을 사용할 수 있습니다
 */

// 아래 타입을 완성시켜주세요.
type PascalCaseWithUnderscore = any
// 아래 테스트 케이스를 통과시켜주세요.


/*
  첫번째 힌트
  - Capitalize 유틸 타입을 를 사용하세요.
  = 재귀적 접근방식이 필요해요.
  - 단계별로 나눠서 생각해보세요.
    - 1. 문자열 공백을 기준으로 나눈다.
    - 2. 나눈 문자열의 첫글자를 대문자로 만든다.
    - 3. 나눈 문자열을 언더스코어로 이어준다.
*/


/*
  두번째 힌트
  - SplitBySpace: 문자열을 공백을 기준으로 나눠서 [배열]로 만드세요.
  - CapitalizeFirst: [배열]의 각 요소들을 대문자로 만드세요.
  - JoinWithUnderscore: 배열의 요소들을 언더스코어로 이어주세요.
*/

/*
  세번째 힌트
  - [] 배열 타입을 infer 키워드를 사용해서 타입을 추출할 수 있어요.
  - ...infer Rest 형식을 사용해서 배열의 나머지 요소들을 추출할 수 있어요.
*/



// 정답
type SplitBySpace<T extends string> = T extends `${infer First} ${infer Rest}`
  ? [First, ...SplitBySpace<Rest>]
  : [T];
type Splited = SplitBySpace<'hello world typescript'>
type Splited2 = SplitBySpace<'hello    world'>

type CapitalizeFirst<T extends string[]> = T extends [infer First extends string, ...infer Rest extends string[]]
  ? [Capitalize<First>, ...CapitalizeFirst<Rest>]
  : [];
type Capitalized = CapitalizeFirst<["hello", "world", "typescript"]>


type JoinWithUnderscore<T extends string[]> = T extends [infer First extends string, ...infer Rest extends string[]]
  ? Rest extends []
    ? First
    : `${First}_${JoinWithUnderscore<Rest>}`
  : '';

type PascalCaseWithUnderscore<T extends string> = JoinWithUnderscore<CapitalizeFirst<SplitBySpace<T>>>;

// 테스트
type Test_6_2_1 = PascalCaseWithUnderscore<'hello world typescript'>; // "Hello_World_Typescript"
type Test_6_2_2 = PascalCaseWithUnderscore<'this is a test'>; // "This_Is_A_Test"
type Test_6_2_3 = PascalCaseWithUnderscore<'single'>; // "Single"
type Test_6_2_4 = PascalCaseWithUnderscore<'hello  world'>; // "Hello__World"