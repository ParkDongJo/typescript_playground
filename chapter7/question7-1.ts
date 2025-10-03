/*
  ramda.js 라는 함수형 프로그래밍 라이브러리에 있는 partialRight 함수를 구현해봅시다.
  partialRight 함수의 사용법은 아래와 같습니다.

  ```typescript
  const greet = (salutation: string, title: string, firstName: string, lastName: string) => salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';

  const greetMsJaneJones = partialRight(greet, ['Ms.', 'Jane', 'Jones']);

  greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
  ```

  아래는 우리가 구현해야할 partialRight 함수입니다. 현재로는 javascript문법으로만 구현되어있습니다.
  이를 typescript로 변환해봅시다.

  ```javascript
  function partialRight(fn, args) {
    return ((...rest) => fn(...rest, ...args));
  }
  ```

  PartialRight 유틸 타입을 구현해봅시다.
  partialRight 함수에 이 PartialRight 유틸 타입을 적용해봅시다.


  [고려사항]
  - any의 사용범위는 작성자의 판단에 맡깁니다.
  - 두번째 인자로 넘어가는 배열의 요소들은 number, string, boolean 타입들만 사용합니다.

*/

type PartialRight<
  Fn extends (...args: any[]) => any,
  Partials extends any[]
> = Fn extends (...args: [...infer Rest, ...Partials]) => infer R
  ? (...args: Rest) => R
  : never;

function partialRight<
  Fn extends (...args: any[]) => any,
  Partials extends any[]
>(
  fn: Fn,
  args: readonly [...Partials]  // 핵심 수정
): PartialRight<Fn, Partials> {
  return ((...rest: any[]) => fn(...rest, ...args)) as any;
}

// 사용 예시
const greet = (salutation: string, title: string, firstName: string, lastName: string) =>
  `${salutation}, ${title} ${firstName} ${lastName}!`;

const greetMsJaneJones = partialRight(greet, ['Ms.', 'Jane', 'Jones'] as const);
// 추론됨: (salutation: string) => string

const results = greetMsJaneJones('Hello'); // 'Hello, Ms. Jane Jones!
console.log(results);


const run = (a: number, b: number, c: number) => a * b + c;

const runPartial = partialRight(run, [1, 2]);

const result2 = runPartial(3);
console.log(result2);


const isTrue = (a: boolean, b: boolean, c: boolean) => a && b || c;

const isTruePartial = partialRight(isTrue, [false, true]);

const result3 = isTruePartial(true);
console.log(result3);



