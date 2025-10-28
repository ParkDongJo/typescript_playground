import { matchString } from "./question9-2";

it("should return true if the string is a valid string", () => {
  expect(matchString("hello")).toBe(true);
});


declare function it(description: string, test: () => void): void;
declare function expect<T>(actual: T): {
  toBe(expected: boolean): void;
};
