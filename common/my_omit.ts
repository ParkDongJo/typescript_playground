interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}

/*
여기서 as는:
P extends K를 평가
true면 never (해당 키를 제거)
false면 P (키를 유지)
이렇게 as를 사용하면 조건에 따라 키를 변형하거나 제거할 수 있습니다. never를 반환하면 해당 프로퍼티는 최종 타입에서 완전히 제외됩니다.
*/
type MyOmit<T, K extends keyof T> = {
  [Key in keyof T as Key extends K ? never : Key]: T[Key]
}


type MyPick<T, K extends keyof T> = {
  [Key in K]: T[Key]
}

type MyPickResult = MyPick<Todo, 'title' | 'completed'>

