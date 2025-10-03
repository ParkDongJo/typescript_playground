type Curried<F> = F extends (...args: infer Arg) => infer Return
  ? Arg extends [infer First, ...infer Rest]
    ? Rest extends []
      ? (a: First) => Return  // Rest가 빈 배열인 경우 최종 호출
      : (a: First) => Curried<(...args: Rest) => Return> // Rest가 빈 배열이 아닌 경우 다음 인자를 받을 수 있는 함수 반환
    : () => Return // 인자가 없는 경우 최종 호출
  : never; // 함수가 아닌 상황


// 한번에 한개의 인수를 가짐  
function curry<F extends Function>(fn: F): Curried<F> {
  // 형식의 유연함 때문에, any가 필요하다
  let curried: Function = (...args: any[]) => {
    if (args.length !== fn.length) {
      return curried.bind(null, ...args);
    }
    return fn(...args);
  };
  return curried as Curried<F>;
}

const addThree = (a: number, b: number, c: number) => a + b + c;

const curried = curry(addThree);

curried(1)(2)(3);

// 불가능
curried(1, 2)(3);
curried(1)(2, 3);



