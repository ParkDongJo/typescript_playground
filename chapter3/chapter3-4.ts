// let 으로 선언한 tobi 는 string 로 까지 타입이 확장된다.
let tobi = 'tobi';
// const 으로 선언한 john 는 john 이라는 리터럴 타입으로, 고정된다.
const john = 'John';

// 단 객체는 JavaScript 의 동작 원리상 다르게 적용된다.
// { name: string, age: number } 형식으로 추론된다.
let personOne = {
    name: 'John',
    age: 30
}
// { name: string, age: number } 형식으로 추론된다.
const personTwo = {
    name: 'John',
    age: 30
}

/*
    객체는 그 속성이 변경될 . 있기 때문이다.
    그래서 아래와 같은 경우 에러 발생
 */
type Circle = {
    radius: number;
    kind: 'circle';
}
type Square = {
    x: number;
    kind: 'square';
}
type Shape = Circle | Square;

const circle = { radius: 10, kind: 'circle' };

// TS2345: Argument of type { radius: number; kind: string; } is not assignable to parameter of type Shape
area(circle)


// 그래서 여기서는 4가지 선택권이 있다.
// 1. 형식을 식별하도록 명시적으로 annotation 사용
const circleOne: Shape = { radius: 10, kind: 'circle' };
area(circleOne)

// 2. 할당문 끝에 형식 assertion 사용
const circleTwo = { radius: 10, kind: 'circle' } as Shape;
area(circleTwo)

// 3. 전체 객체에 형식을 특정하지 않고, 각 속성에 특정 형식을 지정
const circleThree = { radius: 10, kind: 'circle' as 'circle' };
area(circleThree)

// 4. const 를 전체 객체에 사용
const circleFour = { radius: 10, kind: 'circle' } as const;
area(circleFour)
// 4번째는 const 를 통해 객체가 리터럴 형식으로 고정됨으로 아래와 같이 타입 계층에서는 속성 변경이 불가능하다.
circleFour.kind = 'square'; // TS2540: Cannot assign to 'kind' because it is a read-only property.

function area(shape: Shape) {
    if (shape.kind === 'circle') {
        return Math.PI * shape.radius ** 2;
    }
    if (shape.kind === 'square') {
        return shape.x ** 2;
    }
    return assertNever(shape);
}
function assertNever(x: never): never {
    throw new Error('Unexpected object: ' + x);
}