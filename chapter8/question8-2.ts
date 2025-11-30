// TypeScript의 유니온 타입과 인터섹션 타입 변환을 활용한 문제입니다.

// 주어진 타입들이 있습니다:
type BasicUser = {
  id: number;
  name: string;
}

type AdminRole = { role: { type: 'Admin'; permissions: string[] } }
type EditorRole = { role: { type: 'Editor'; editScope: string[] } }
type ViewerRole = { role: { type: 'Viewer'; viewScope: string[] } }





type RootUser = BasicUser & (AdminRole | EditorRole | ViewerRole)


// 아래의 각각의 타입 결과가 나오도록 타입을 가공해주세요.
// 결과 ->  "Admin" | "Editor" | "Viewer"



// 2번 결과 -> { type: 'Admin' } | { type: 'Editor' } | { type: 'Viewer' }
// 조건> 이 경우는 최대한 범용적으로 쓰일 수 있는 유틸타입으로 만들어주세요.


//1번 정답
type UserRoles = RootUser['role'];
// 결과: { isAdmin: boolean; permissions: string[] } | { isEditor: boolean; editScope: string[] } | { isViewer: boolean; viewScope: string[] }
type UserRolesKeys = UserRoles['type'];


//2번 정답
type UnionKeyField<T, K extends keyof T> =
  T extends Record<K, unknown>
  ? { [P in keyof T]: P extends K 
      ? { [Key in P]: T[P] } 
      : never 
    }[keyof T]
  : never
type UserRoleTypeOnly = UnionKeyField<UserRoles, 'type'>;



type ExtractNested<T, Keys extends string[]> = Keys extends [infer First extends string, ...infer Rest extends string[]]
  ? T extends { [K in First]: infer V }
    ? Rest extends []
      ? { [Key in First]: V }
      : ExtractNested<V, Rest>
    : never
  : T;

// type RoleType = ExtractNested<AdminRole, ['role', 'type']>;


type WrapWithKey<T, K extends string> = T extends any ? { [P in K]: T } : never;

type Result = WrapWithKey<ExtractNested<RootUser, ['role', 'type']>, 'type'>;