
// 정화님
// ------------------------------------------------------------
//1.
type SetReadonly<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;
// Readonly아닌속성 -> Omit<T,K>로 대상 속성 K를 뺀 속성 만들고
// Readonly인 속성 -> Pick으로 해당 속성을 Readonly로 만들어 둘을 합침(교집합)


type CommonProperties<T, U> = {
  [P in keyof T & keyof U]: T[P];
};
//keyof T & keyof U > T와 U의 공통속성을 추출한다.


// 2.
type ExtractRoleType<T> = T extends  { role : { type : infer U }} ? U : never;
//type 안에들어있는 "Admin" | "Editor" | "Viewer"를 U라는 이름으로 추출,
// type에서 추출하면 U 아니면 never -> { role : {type: U}} 면 U 반환

type RoleTypeValues = ExtractRoleType<RootUser>;
// type RoleTypeValues = "Admin" | "Editor" | "Viewer"


//3.
// matchColor는 인수를 color: string으로 정의해서 모든 문자열을 받을 수 있다.
// 그런데 return colorMap[color]; 할 때, colors 배열에 없는 문자열도 들어올 수 있다.
// 그래서 타입스크립트는 타입 안전성 문제로 에러를 발생시킨다.

function matchColor(color: string) : string {
  if ((colors as readonly string[]).includes(color)) {
    return colorMap[color as keyof typeof colorMap];
  } else {
    return "기타";
  }
}


// 4.
describe('matchString', () => {
  it( 'matchString test - string', ()=> {
    expect(matchString('hello')).toBe(true)
  })

  it( 'matchString test - number', ()=> {
     expect(matchString('test123')).toBe(false)
  })

})



// lhc0506 님
// ------------------------------------------------------------
// 문제1
type Remap<T> = {
  [K in keyof T]: T[K];
}

type DeepReadonly<T> = T extends object ? {
  readonly [K in keyof T]: DeepReadonly<T[K]>;
} : T;

type SetReadonly<T, K extends keyof T =keyof T> = Remap<DeepReadonly<Pick<T,K>> & Omit<T,K>>;

type CommonProperties<T, U> = {
  [K in keyof T & keyof U as
    T[K] extends U[K] ? (U[K] extends T[K] ? K : never) : never
  ]: T[K];
};

// 문제2
type RoleTypeValues = RootUser['role']['type']

type PickKeys<T extends object, K extends keyof T> = {
  [U in keyof T]: {
    [P in U]: T[P]
  }
}[K]

type RoleTypes = PickKeys<RootUser['role'], 'type'>

// 문제3
function isColor(value: string): value is typeof colors[number] {
  return colors.includes(value as typeof colors[number])
}

function matchColor(color: string) {
  if (isColor(color)) {
    return colorMap[color];
  } else {
    return "기타";
  }
}
// args의 color를 color key로 단언하면 '기타'가 나올 수 없음. 그래서 함수를 만들어줘서 string이 통과하면 color key로 타입가드를 해주어 통과시킴



// JopopScript 님
// ------------------------------------------------------------
// 1번문제
type Roll<T> = {
  [K in keyof T]: T[K]
} & {}

type SetReadonly<T extends object, R extends keyof T> = Roll<{
  readonly [P in R]: T[R]
} & {
  [K in Exclude<keyof T, R>]: T[K]
}>

type CommonKey<K extends PropertyKey, R extends object> = K extends keyof R ? K : never;
type CommonProperties<L extends object, R extends object> = {
  [K in CommonKey<keyof L, R>]: L[K]
}


// 2번문제
type RoleTypeValues = AdminRole['role']['type'] | EditorRole['role']['type'] | ViewerRole['role']['type']

type RoleTypes<T> = T extends { role: { type: infer TypeValue } }
  ? TypeValue extends RoleTypeValues
    ? { type: TypeValue }
    : never
  : never;
type test = RoleTypes<AdminRole> | RoleTypes<EditorRole> | RoleTypes<ViewerRole>


// 3번문제
// Array는 제네릭으로 요소의 형태와 동일한 것으로 indexOf호출이 가능하기 때문
function indexOf<T extends U, U>(coll: ReadonlyArray<T>, el: U): el is T {
  return coll.indexOf(el as T) != -1;
}

function matchColor(color: string) {
  if (indexOf(colors, color)) {
    return colorMap[color];
  } else {
    return "기타";
  }
}

// 4번문제
// match.test.ts
import { matchString } from './match';
it('matchString의 인자가 1개이상의 문자열일떈 true를 반환한다', () => {
  expect(matchString('abc123')).toBe(false);
  expect(matchString('123')).toBe(false);
  expect(matchString('!@#')).toBe(false);
  expect(matchString('')).toBe(false);
});
//jest.d.ts
function it(title: string, fn: () => void): void;
function expect<T>(actual: T): Compare<T>;
type Compare<T> = { toBe(expected: T): void; };


// 찰쓰
// ------------------------------------------------------------
// 문제1
type SetReadonly<T, K extends keyof T> = Remap<Omit<T, K> & Readonly<Pick<T, K>>>;

type CommonProperties<T, U> = Remap<Pick<T, Extract<keyof T, keyof U>>>;

// 문제2
type UserRoles = RootUser['role'];
// 결과: { isAdmin: boolean; permissions: string[] } | { isEditor: boolean; editScope: string[] } | { isViewer: boolean; viewScope: string[] }

type UserRolesKeys = UserRoles['type'];

type UnionKeyField<T, K extends keyof T, V> =
  T extends infer R
    ? R extends Record<K, V>
      ? Pick<R, K>
      : never
    : never;

type UserRoleTypeOnly = UnionKeyField<UserRoles, 'type', string>;


// 문제3
function hasColor<T extends U, U>(array: ReadonlyArray<T>, el: U): el is T {
  return array.indexOf(el as T) !== -1;
}

function matchColorV2(color: string) {
  if (hasColor(colors, color)) {
    // 여기서는 color가 "RED" | "GREEN" | "BLUE"로 좁혀진다
    return colorMap[color];
  } else {
    return "기타";
  }
}

// 문제4
import { matchString } from "./question9-2";

it("should return true if the string is a valid string", () => {
  expect(matchString("hello")).toBe(true);
});

declare function it(description: string, test: () => void): void;
declare function expect<T>(actual: T): {
  toBe(expected: boolean): void;
};
