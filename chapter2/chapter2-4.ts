/*
    속성명이 필요 없는 것이 배열을 활용하여, 튜플 형태를 만드는 방식의 장점이다.


 */
type Person = [name: string, age: number];
// TS2739: Type (string | number)[] is missing the following properties from type Person: name, age
let person: Person= ['John', 30];

// TS2488: Type Person must have a [Symbol. iterator]() method that returns an iterator.
const [pName, pAge]: Person = person;

console.log(pName, pAge); // John 30

// TS2370: A rest parameter must be of an array type.
function hello(...age: Person) {
    console.log(age);
}

/*
TS2345: Argument of type any[] is not assignable to parameter of type Person
Type any[] is missing the following properties from type Person: name, age
TS2488: Type Person must have a [Symbol. iterator]() method that returns an iterator.
 */
hello(...person); // [ 'John', 30 ]
