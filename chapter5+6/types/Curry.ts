
import type Cast from "./Cast";
import type Drop from "./Drop";
import type Length from "./Length";
import type Gaps from "./Gaps";


/**
 * 함수를 커리한다.
 * 예시: Curry<(a: number, b: number, c: number) => number> -> (a: number) => (b: number) => (c: number) => number
 * @param F 커리할 함수
 * @returns 커리된 함수
 */
type Curry<F extends (...args: any[]) => any> = <
  T extends any[],
  // 커리할 함수의 인자를 제거한 배열 (남은 인자의 개수가 1개 이상인 경우)
  // 예시: Drop<Length<[number, number, number]>, [number, number, number]> -> [number, number]
  G = Drop<Length<T>, Parameters<F>>, 
>(
  // 인자배열을 빈 값을 제거한 배열로 캐스팅
  // 예시: Cast<[number, undefined, number], Gaps<[number, undefined, number]>> -> [number, number]
  ...args: Cast<T, Gaps<Parameters<F>>>
) => G extends [any, ...any[]]
  // 남은 인자의 개수가 1개 이상인 경우 다시 커리함수를 호출
  // G extends [any, ...any[]] 대신에
  /*
    G extends any[]를 사용하면:
    빈 배열 []도 조건을 만족합니다
    모든 배열 타입이 이 조건을 통과하므로, 남은 인자가 없는 경우에도 계속 재귀적으로 Curry를 호출하게 됩니다

    G extends [any, ...any[]]를 사용하면:
    최소 1개 이상의 요소를 가진 배열만 조건을 만족합니다
  */
  ? Curry<((...args: G) => ReturnType<F>)>
  : ReturnType<F>;

export default Curry;


