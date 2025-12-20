// https://github.com/type-challenges/type-challenges/blob/main/questions/00108-medium-trim/README.md 
// 중급 문제

type MyTrimmed<S extends string> = S extends ` ${infer Rest}` ? MyTrimmed<Rest> : S extends `${infer Rest} ` ? MyTrimmed<Rest> : S;

type MyTrimmedResult = MyTrimmed<'   Hello World   '>;
