import { matchString } from "./question9-2";

// 아래 발생하는 에러를 해결해주세요
/*
Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.ts(2582)
*/
it("should return true if the string is a valid string", () => {
  expect(matchString("hello")).toBe(true);
});


// 문제 제공할때,
// package.json
// jest.config.js
// 제공해야한다.

/*
  정답
*/
declare function it(description: string, test: () => void): void;
declare function expect<T>(actual: T): {
  toBe(expected: boolean): void;
};
