let aNumber = 2;
let anotherNumber: number = 3;

type UserPerson = {
    name: string;
    age: number;
}
type User = {
    id: number;
    name: string;
    age: number;
}

const meme = createPerson();
const user: User = {
    id: 1,
    name: 'John',
    age: 30
}
const robot = {
    id: 1,
    model: 'TRX1000',
    code: 'TRX'
}

printPerson(meme);
// 형식의 모양이나 구조가 일치하면 호환되는 것으로 간주
// User 타입은 id 속성을 추가로 가지고 있지만 Person 타입과 호환됨
printPerson(user);

// TS2345: Argument of type { id: number; model: string; code: string; } is not assignable to parameter of type Person
printPerson(robot);

// 리터럴은 추가 속성을 허용하지 않음
// TS2353: Object literal may only specify known properties, and id does not exist in type Person
printPerson({
    id: 2,
    name: 'Jane',
    age: 30
})

function createPerson() {
    return {
        id: 1,
        name: 'John',
        age: 30
    };
}
function printPerson(person: UserPerson): void {
    console.log(person);
}
