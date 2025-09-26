/*
    Union Type 을 체크 할 시, 새로운 타입이 Union 에 추가되면 추가된 타입을 체크하는 코드를 추가해야 한다.
    이때, 오류를 방지하기 위해 never 타입을 사용할 수 있다.
 */

type Circle = {
    radius: number;
    kind: 'circle';
}
type Square = {
    x: number;
    kind: 'square';
}
// 만약 Rectangle 이 추가된다면
type Rectangle = {
    x: number;
    y: number;
    kind: 'rectangle';
}
type Shape = Circle | Square | Rectangle;

function area(shape: Shape) {
    if (shape.kind === 'circle') {
        return Math.PI * shape.radius ** 2;
    }
    if (shape.kind === 'square') {
        return shape.x ** 2;
    }
    // shape 는 never 가 된다
    // Rectangle 이 추가되면 아래 shape 는 Rectangle 가 된다.
    throw new Error('Unexpected object: ' + shape); // shape 는 never 가 된다
    // return assertNever(shape);
}

/*
    never 는 바닥 형식으로 형식 계층의 가장 아래에 위치한다.
    never 와 호환되는 값은 존재하지 않는다. 즉 어떤 값이 never 라면 이는 오류가 발생했다는 의미이다

    하지만 아래 예제는 never 을 활용하여, 타입스크립트가 새로운 추가사항에 대해서도 모두 검사하도록 강제할 수 있다.
 */
function area2(shape: Shape) {
    if (shape.kind === 'circle') {
        return Math.PI * shape.radius ** 2;
    }
    if (shape.kind === 'square') {
        return shape.x ** 2;
    }
    if (shape.kind === 'rectangle') {
        return shape.x * shape.y;
    }
    assertNever(shape);
}
function assertNever(x: never): never {
    throw new Error('Unexpected object: ' + x);
}