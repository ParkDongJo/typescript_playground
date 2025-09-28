class Fox {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
class Dog {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
/*
  n 과 제네릭 T 를 받고, T[] 을 반환하는 함수를 만드세요.
  단, 제네릭은 클래스 타입만 허용해야합니다.

  클래스는 Fox와 Dog를 매개변수로 허용하는 createInstanceArray 함수를 만드세요.
*/
function createInstanceArray() {}

console.log(createInstanceArray(3, Fox));
console.log(createInstanceArray(3, Dog));
console.log(createInstanceArray(3, 1)); // 타입 오류
console.log(createInstanceArray(3, []])); // 타입 오류
console.log(createInstanceArray(3, {})); // 타입 오류
console.log(createInstanceArray(3, { name: 'test' })); // 타입 오류