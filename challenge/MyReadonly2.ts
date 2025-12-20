//https://github.com/type-challenges/type-challenges/blob/main/questions/00008-medium-readonly-2/README.md

type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P]
} & {
  [P in keyof T as P extends K ? never : P]: T[P]
}

// 여기서 두가지를 다시 한번 더 복습!
// as 활용
// 제네릭의 기본값 설정
// & 와 never 활용

// 인터섹션의 두번째 정의는
// [키 as 조건부에 의한 결과]: T[키]
// 이렇게 키를 조건부에 의한 결과로 바꿔서 타입을 정의하는 것

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

type TodoPreview0 = MyReadonly2<Todo1>

type TodoPreview1 = MyReadonly2<Todo1, 'title'>
// title은 읽기 전용이 되고, description과 completed는 그대로 