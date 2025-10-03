/*
  Parameters, ReturnType 기본 유틸 타입
*/


function defer<Fn extends (...args: any[]) => any>(
  fn: Fn, 
  ...args: MyParameters<Fn>
): () => MyReturnType<Fn> {
  return () => fn(...args);
}

type MyParameters<Fn extends (...args: any[]) => any> = 
  Fn extends (...args: infer P) => any ? P : never;


type Result3 = {
  page: `/pages/${string}`;
  title: string;
  content: string;
}

const search = (query: string): Promise<Result3> => {
  throw new Error('Not implemented');
}

const searchDeferred = defer(search, 'test');
search('test');
searchDeferred();
