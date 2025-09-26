/*
    형식과 값의 영역!!

    [ TypeScript : 형식의 계층 ] -> type, interface
    [ JavaScript : 값의 계층 ] -> const, let, var, function, class
 */

// 형식의 영역
// TypeScript의 영역
type Person = {
    name: string;
    age: number;
}
type Collection = Person[]


// 값의 영역
// JavaScript의 영역
function printCollection(coll : Collection) {
    console.log(...coll.entries())
}


/*
    형식 계층 -> 값 소비 가능
    값 계층 -> 형식 소비 불가능 -> typeof 키워드 가능

    class 는 형식, 값으로 사용 가능
    enum 은 형식, 값으로 사용 가능
 */
// 형식의 영역에서 값 소비
const personJson = {
    name: 'John',
    age: 30
}

// 값의 영역에서 형식 소비 가능하게끔 typeof 키워드 사용
// typeof 키워드를 사용해서 값을 형식으로 정의
type PersonValueType = typeof personJson;

interface Cat {
    name: string;
    age: number;
}
type CatInterfaceType = Cat;

enum Color {
    Red,
    Green,
    Blue
}
type ColorEnumType = Color;

class Robot {
    model: string;
    constructor(model: string) {
        this.model = model;
    }
}
type RobotClassType = Robot;

// 값으로 사용
const robotClass = new Robot('TRX1000');

function printRobot(robot: RobotClassType): void {
    console.log(robot);
}

function checkRobot(robot: RobotClassType): boolean {
    return robot instanceof Robot;
}

// 같은 형식이라서 허용!
printRobot(robotClass);
printRobot({ model: 'TRX2000' });  // { model: 'TTTT' }

// instanceof 연산자는 값의 계층에서만 사용 가능
console.log(checkRobot(robotClass));   // true
console.log(checkRobot({ model: 'TRX2000' }));  // false
