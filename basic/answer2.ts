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
  n 과 제네릭 T 를 받고, T[] 을 반환하는 함수를 만들어줘
  T 는 무조건 클래스가 되도록 해줘
*/
function createInstanceArray<T>(n: number, anything: { new(...args: string[]): T; }): T[] {
  return Array.from({ length: n }, () => new anything());
}

console.log(createInstanceArray(3, Fox));
console.log(createInstanceArray(3, Dog));
console.log(createInstanceArray(3, 1)); // 타입 오류
console.log(createInstanceArray(3, []])); // 타입 오류
console.log(createInstanceArray(3, {})); // 타입 오류
console.log(createInstanceArray(3, { name: 'test' })); // 타입 오류
