import type Curry from "./types/Curry";

function curry<F extends (...args: any[]) => any>(f: F): Curry<F> {
  // arity는 함수의 인자 개수를 의미 (=항수)
  const arity = f.length;

  return (function resolver(...args: unknown[]) {
    const memory = [...args];

    return function (...innerArgs: unknown[]) {
      const local = [...memory, ...innerArgs];
      const next = local.length >= arity ? f : resolver;

      return next(...local);
    };
  })() as any;
}

export default curry;