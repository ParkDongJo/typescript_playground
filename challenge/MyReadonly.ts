// https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.md
// 문제
type MyReadonly<T> = { readonly [Key in keyof T]: T[Key]}