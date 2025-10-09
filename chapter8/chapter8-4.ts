type GetRequired<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K];
};

type RequiredKeys<T> = keyof GetRequired<T>

type GetOptional<T> = Omit<T, RequiredKeys<T>>

type People = {
  name: string;
  age?: number;
}

type Sutdent = {
  name: string;
  semester: number;
}

function printPeople(p: People) {
  console.log(p.name);
}
const student: Sutdent = {
  name: 'John',
  semester: 1,
}

// student 까지 허용이됨
// age 가 옵셔널이라거 생기는 문제
printPeople(student)

type RequirededPeople = GetRequired<People>
type OptionaledPeople = GetOptional<People>

function printRequiredPeople(p: RequirededPeople) {
  console.log(p.name);
  console.log(p.age);
}

function printOptionalPeople(p: OptionaledPeople) {
  console.log(p.name);
  console.log(p.age);
}

printRequiredPeople(student)
printOptionalPeople(student)


