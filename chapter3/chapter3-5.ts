type Dice = 1 | 2 | 3 | 4 | 5 | 6;


/*
    value 는 number 타입을 모두 수용할수 있지만, value 가 Dice 타입이라는걸
    value is Dice 문법을 사용해서 명시적으로 선언했다.

    is keyword 를 사용해서
    인풋은 number 타입으로 넓게 받고
    리턴은 Dice 타입으로 형식을 좁혀 줄 수 있다.

 */
function isDice(value: number): value is Dice {
    return [1, 2, 3, 4, 5, 6].includes(value);
}

function rollDice(input: number) {
    if (isDice(input)) {
        console.log('It is a dice');
    } else {
        console.log('It is number');
    }
    return input;
}


// 이 방법이 여전히 가지고 있는 단점은
// isDice 이라는 헬퍼 함수의 조건 자체가 유효한지 까지 확인하지 못한다.

// 아래 조건은 3.21231 같은 소수점도 통과가 된다.
// 테스트 코드로 검증하는것을 추천하고 있다.
function isDice2(value: number): value is Dice {
    return value >= 1 && value <= 6;
}

console.log(isDice(3.21231)); // false
console.log(isDice2(3.21231)); // true
