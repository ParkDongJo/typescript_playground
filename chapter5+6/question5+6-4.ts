/*
  문자열 S에서 From를 찾아 한 번만 To로 교체하는 Replace<S, From, To>를 구현하세요.
*/

// type Replace = any;

type Replace<S extends string, Target extends string, To extends string> = 
Target extends '' 
  ? S
  : S extends `${infer Pre}${Target}${infer Tail}` 
    ? `${Pre}${To}${Tail}`
    : S;


type Result = Replace<'foobar', 'bar', 'foo'> // 'foofoo'
type Result2 = Replace<'foobarbar', 'bar', 'foo'> // 'foofoobar'
type Result3 = Replace<'foobarbar', '', 'foo'> // 'foobarbar'
type Result4 = Replace<'foobarbar', 'bar', ''> // 'foobar'
type Result5 = Replace<'foobarbar', 'bra', 'foo'> // 'foobarbar'
type Result6 = Replace<'', '', ''> // ''


