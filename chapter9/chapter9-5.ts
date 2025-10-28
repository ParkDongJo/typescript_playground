const collection = [1, 2, 3, undefined, null, 'hello'] as const;

// (string | number | null | undefined)[]
// 아래 와 같이 필터링이 가능하다.
const filtered = collection.filter((val) => !!val);

// interface Array<T> {
//   filter(predicate: BooleanConstructor): NonNullable<T>[];
// }

// interface ReadonlyArray<T> {
//   filter(predicate: BooleanConstructor): NonNullable<T>[];
// }

// 위 설정을 통해 아래와 같은 검증도 가능하다.
// 고 하는데... 전혀 안되는데????...
const filteredV2 = collection.filter(Boolean);

type Truthy<T> = T extends '' | false | 0 | 0n ? never : T;

interface Array<T> {
  filter(predicate: BooleanConstructor): Truthy<NonNullable<T>>[];
}

interface ReadonlyArray<T> {
  filter(predicate: BooleanConstructor): Truthy<NonNullable<T>>[];
}

// 안된다...
const filteredV3 = collection.filter(Boolean);


