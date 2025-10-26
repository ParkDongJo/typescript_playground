// 두 객체를 합치는 타입을 만들어주세요.

type Boo = {
  name: string
  age: string
}
type Coo = {
  age: number
  sex: string
}

type Result = Merge<Boo, Coo>
// expected to be {name: string, age: number, sex: string}


type Merge<O1, O2> = {
  [k in keyof O1 | keyof O2]: k extends keyof O1
    ? O1[k]
    : k extends keyof O2
    ? O2[k]