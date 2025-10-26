// 문제:
// Product 타입 배열을 특정 속성 타입별로 필터링하는 제네릭 타입을 구현하세요.

export {}; // 모듈로 만들어서 타입 충돌 방지

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
  tags: string[];
  rating?: number;
}

// 1. FilterByType 제네릭 타입을 구현하세요.
// - 첫 번째 파라미터로 객체 타입을 받습니다.
// - 두 번째 파라미터로 필터링할 값의 타입을 받습니다.
// - 해당 타입의 속성만 포함하는 새로운 타입을 반환합니다.
type FilterByType<O, T> = {
  [K in keyof O as O[K] extends T ? K : never]: O[K];
}

// 2. ExcludeByType 제네릭 타입을 구현하세요.
// - 첫 번째 파라미터로 객체 타입을 받습니다.
// - 두 번째 파라미터로 제외할 값의 타입을 받습니다.
// - 해당 타입이 아닌 속성만 포함하는 새로운 타입을 반환합니다.
type ExcludeByType<O, T> = {
  [K in keyof O as O[K] extends T | undefined ? never : K]: O[K];
}

// 2) 옵셔널 표기 정규화: (T | undefined)? => T?
type DropOptionalOrType<O, T> = {
  [K in keyof O as
    // (a) 진짜 옵셔널 키면 제거
    ({} extends Pick<O, K> 
      ? never : O[K] extends T
      // (c) boolean이면(옵셔널 여부 무관) 제거
        ? never: K)
  ]: O[K];
};

// 리한님의 풀이
type ExcludeByType1<O, T> = {
  [K in keyof O as undefined extends O[K] 
    ? never : Extract<O[K], T> extends never 
    ? K : never
  ]: O[K];
};
// 리한님의 시도 1
type ExcludeByType2<O, T> = {
  [K in keyof O as O[K] extends T | undefined ? never : K]: O[K];
};
// 리한님의 시도 2
type ExcludeByType3<O, T> = {
  [K in keyof O as Extract<O[K], T> extends never ? K : never]: O[K];
};

// 테스트 케이스
type StringFields = FilterByType<Product, string>;
// 예상 결과: { name: string; description: string; }

type NumberFields = FilterByType<Product, number>;
// 예상 결과: { id: number; price: number; rating?: number; }

type NonStringFields = DropOptionalOrType<Product, string>;
// 예상 결과: { id: number; price: number; inStock: boolean; tags: string[]; rating?: number; }

type NonBooleanFields = ExcludeByType1<Product, boolean>;
// 예상 결과: { id: number; name: string; price: number; description: string; tags: string[]; rating?: number; }

// 실제 사용 예시
const stringProduct: StringFields = {
  name: "Laptop",
  description: "High performance laptop",
};

const numberProduct: NumberFields = {
  id: 1,
  price: 1200,
  rating: 4.5, // 이제 정상 동작합니다!
};

const nonStringProduct: NonStringFields = {
  id: 1,
  price: 1200,
  inStock: true,
  tags: ["electronics", "computers"],
  rating: 4.5,
};

// ===== 정답 =====

/*
핵심 개념 정리:

1. Mapped Types with Key Remapping (as 절 사용):
   [K in keyof O as CONDITION ? K : never]: O[K]
   - CONDITION이 true이면 K(속성명)를 유지
   - CONDITION이 false이면 never로 만들어서 속성 제거

2. Type Extends Check:
   O[K] extends T | undefined
   - O[K]가 T 타입이거나 undefined인 경우 true
   - optional 속성(?:)을 처리하기 위해 | undefined 포함 필수

3. 타입 필터링 패턴:
   - 포함 패턴 (FilterByType): extends T | undefined ? K : never
     → T 타입이면 속성을 유지(K), 아니면 제거(never)
   
   - 제외 패턴 (ExcludeByType): extends T | undefined ? never : K
     → T 타입이면 속성을 제거(never), 아니면 유지(K)

4. Union 타입 활용 (보너스):
   - GetFieldsByTypeList는 TList를 Union으로 받습니다.
   - O[K] extends TList는 O[K]가 TList의 멤버 중 하나라도 일치하면 true
   - 예: string | number | boolean을 전달하면 세 타입 중 하나라도 맞으면 포함

5. chapter5-4.ts 연관성:
   - SelectByKey<O, T> === FilterByType<O, T>
   - RemoveByKey<O, T> === ExcludeByType<O, T>
   동일한 개념을 다른 이름으로 연습하는 문제입니다.
*/
