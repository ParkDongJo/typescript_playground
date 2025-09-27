type Phone = {
  name?: string;
  serialNumber: number;
}

type PersonStrings = {
  [K in keyof Phone]: Phone[K] extends string ? Phone[K] : never;
}

const p: PersonStrings = {
  name: "John",
  serialNumber: never,
}

type PersonStrings2 = {
  [K in keyof Phone as Phone[K] extends string | undefined ? K : never]: Phone[K];
}

const p2: PersonStrings2 = {
  name: undefined,
}

/*
  제네릭을 이용해 공통으로 쓸수 있는 타입을 만든다.
*/
// T 로 넘긴 타입의 key 만 가져온다.
type SelectByKey<O, T> = {
  [K in keyof O as O[K] extends T | undefined ? K : never]: O[K];
}
// T 로 넘긴 타입의 key 만 제거한다.
type RemoveByKey<O, T> = {
  [K in keyof O as O[K] extends T | undefined ? never : K]: O[K];
}

type PersonStrings3 = SelectByKey<Phone, string>;
type PersonStrings4 = RemoveByKey<Phone, string>;

const p3: PersonStrings3 = {
  name: "John",
}
const p4: PersonStrings4 = {
  serialNumber: 1234567890,
}