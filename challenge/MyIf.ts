// https://github.com/type-challenges/type-challenges/blob/main/questions/00268-easy-if/README.md
// 기초 문제

type MyIf<T extends boolean, A, B> = T extends true ? A : B;

const condition = true;
type MyIfResult = MyIf<typeof condition, 'a', 'b'>;

