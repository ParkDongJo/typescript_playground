type Union = 'hello' | 'world' | 'foo' | 'bar';

type MyExclude<T, U> = T extends U ? never : T;

type Result = MyExclude<Union, 'hello' | 'world'>;


