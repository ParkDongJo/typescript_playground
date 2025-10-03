
type FnV3<Left extends any[], Right extends any[]> = (...args: [...Left, ...Right]) => any;

function curryV3<Left extends any[], Right extends any[], Result>(
  fn: (...args: [...Left, ...Right]) => Result,
  ...left: Left
) {
  return (...right: Right) => fn(...left, ...right);
}

const addFive = (a: number, b: number, c: number, d: number, e: number) => a + b + c + d + e;

const curriedV3 = curryV3(addFive, 1, 2, 3);

const last = curriedV3(4, 5);






