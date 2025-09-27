// 정답

// 정화님
// infer 키워드까지 생각했었지만, 그 이상으로는 어떻게 해야할지 막막했다.


// JopopScript님
type MyReturnType<T> = T extends (...args: any) => infer R
  ? R
  : never;




