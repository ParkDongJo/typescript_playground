type  PersonProps = [string, number];

const [name, age]: PersonProps = ["John", 20];

// 위 튜플은 정해진, [string number] 형태로 고정되어 있다.
// 하지만 앞,뒤만 같은 타입이고 중간타입들을 자유롭게 받아도 되는 튜플을 만들어야한다면,

type Foo<T extends unknown[]> = [string, ...T, number];

const foo: Foo<[boolean, string]> = ["1", true, "2", 3];
const foo2: Foo<[]> = ["1", 3];
const foo3: Foo<[boolean, string, number]> = ["1", true, "2", 4, 3];


// 위 개념을 가변 튜플 형식 이라고 표현한다.

function concat<T extends unknown[], U extends unknown[]>(arr1: T, arr2: U): [...T, ...U] {
  return [...arr1, ...arr2];
}

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = concat(arr1, arr2);

// 그런데 이걸 만약 유틸 타입으로 정의한다면,
// [문제] 로 출제해볼만한 문제

type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];

const arr4 = [1, 2, 3];
const arr5 = [4, 5, 6];

const arr6: Concat<typeof arr4, typeof arr5> = [1, 2, 3, 4, 5, 6];
