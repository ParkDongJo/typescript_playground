/*
    타입스크립트에서 void 는 undefined 의 하위 형식이다.
    암묵적으로 undefined 를 반환하는 함수에 대한 반환 타입으로 사용된다.
 */
function handleClick(): void {
    console.log('Click!');
}

function litener(
    callback: (param1: number, param2: number[]) => void
): void {
    return callback(200, [100, 200, 300]);
}

function callback1(num: number, arr: number[]): void {
    console.log(num, arr);
}
// 정의한 callback 선언한 인수보다 더 적은 수의 인수를 사용해도 callback 전달이 가능하다
// 반환형식이 void 가 아니더라도 callback 전달이 가능하다
function callback2(num: number): boolean {
    console.log(num);
    return true;
}

litener(callback1)
litener(callback2)


// 아래의 반환 형식은 뭐가 될까?
// 실제 JavaScript 에서는 true 를 내 뱉겠지만.
// TypeScript 에서는 undefined 가 반환되는 형식으로 인식하낟..
console.log(litener(callback2)) // undefined
