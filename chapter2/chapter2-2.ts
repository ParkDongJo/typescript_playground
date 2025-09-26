/*
형식을 끄고 싶은 상황 -> any
주의가 필요할 때 -> unknown

unknown 은 TypeScript 3.0 버전부터 추가된 타입
*/

/*
any -> 모든 타입을 허용
unknown -> 아무것도 할 수 없다, 값을 전달할 수 있을 뿐이다.
 */
const me: unknown = 'John';
const name: string = me; // TS2322: Type 'unknown' is not assignable to type 'string'.

// unknown 타입에 다른 타입을 할당하는 건 가능하다.
const name2: string = 'John';
const me2: unknown = name2;

// unknown 타입을 사용하면 타입을 더 명시적으로 지정할 수 있다.
// unknown 타입은 항상 타입을 먼저 확인 한 후에 무언가를 시도할 수 있기 때문에 any 타입보다 더욱 안전합니다.

function doSomething(value: unknown) {
    if (typeof value === 'string') {
        console.log('It is a string');
    }
    if (typeof value === 'number') {
        console.log('It is a number');
    }
    console.log('It is a ' + typeof value);
}

// unknown을 사용해 타입 좁히기
doSomething('Hello, world!');
