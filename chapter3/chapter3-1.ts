type BoardGame = {
    name: string;
    price: number;
    quantity: number;
    minimumAge: number;
    player: number;
}
type Puzzle = {
    name: string;
    price: number;
    quantity: number;
    minimumAge: number;
    piece: number;
}
type Doll = {
    name: string;
    price: number;
    quantity: number;
    minimumAge: number;
    material: string;
}

type ToyBase = {
    name: string;
    price: number;
    quantity: number;
    minimumAge: number;
}

const doll: Doll = {
    name: 'doll',
    price: 10000,
    quantity: 10,
    minimumAge: 3,
    material: 'plastic'
}

// 타입스크립트는 구조적 타이핑을 사용하기 때문에 ToyBase 형식에 Doll 형식을 할당할 수 있다.
// 그러므로 아래 코드는 에러가 발생하지 않는다.
print(doll)
function print(toy: ToyBase) {
    console.log(toy);
}

/*
    하지만 위와 방식은 좋지 않다. 공통적이지 않은 속성은 제외가 되고, 완벽히 모든 타입을 검증했다고 볼 수 없다.
    이때 사용하는 것이 유니언(Union) 타입이다. | 라는 연산자로 표현된다.

    Union 타입은 합집합과 같다

 */

type Toy = BoardGame | Puzzle | Doll;

const rabbitDoll: Toy = {
    name: 'robot',
    price: 10000,
    quantity: 10,
    minimumAge: 3,
    material: 'plastic'
}

print2(rabbitDoll)
function print2(toy: Toy) {
    console.log(toy);
}

/*
    기존에 선언해둔 ToyBase 형식을 좀더 활용한다면, ToyBase 형식에는 공통적인 속성만을 선언하고, 나머지 속성을 추가적으로 선언한다.
    이때 사용하는 것이 인터섹션(Intersection) 타입이다. & 라는 연산자를 통해 표현이 된다.

    Intersection 타입은 교집합과 같다
 */

type BoardGame2 = ToyBase & {
    player: number;
}
type Puzzle2 = ToyBase & {
    piece: number;
}
type Doll2 = ToyBase & {
    material: string;
}

const dogDoll: Doll2 = {
    name: 'dog doll',
    price: 10000,
    quantity: 10,
    minimumAge: 3,
    material: 'plastic'
}

print3(dogDoll)
function print3(toy: BoardGame2 | Puzzle2 | Doll2) {
    console.log(toy);
}