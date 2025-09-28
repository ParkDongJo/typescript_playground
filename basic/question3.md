문제에 예제가 주어집니다. 각 예제에서 만들고자 하는 타입은 any 로 선언되어 있습니다.
문제에서 요구하는 구체적인 타입을 만들어 봅시다.

## 문제 1

다음 코드에서 `User` 인터페이스의 모든 속성을 선택적으로 만들고 싶습니다. `any` 부분에 들어갈 적절한 유틸 타입은?

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type UpdateUser = any; // 모든 속성이 선택적이어야 함
// 사용 예: { name?: string, email?: string } 형태로 업데이트 가능
```

---

## 문제 2

다음 코드에서 `Product` 인터페이스에서 `id`와 `createdAt` 속성만 제외하고 나머지 속성들로 새로운 타입을 만들려고 합니다. `any` 부분에 들어갈 적절한 유틸 타입은?

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  createdAt: Date;
}

type CreateProduct = any; // id와 createdAt 제외한 타입
// 결과: { name: string; price: number; description: string; }
```

---

## 문제 3

다음 코드에서 `DatabaseConfig` 클래스의 생성자 매개변수 타입들을 튜플로 추출하고 싶습니다. `any` 부분에 들어갈 적절한 유틸 타입은?

```typescript
class DatabaseConfig {
  constructor(
    public host: string,
    public port: number,
    public username: string,
    public password: string,
    public ssl?: boolean
  ) {}
}

type DbConfigParams = any;
// 사용 예: const params: DbConfigParams = ["localhost", 5432, "user", "pass", true];
```

---

## 문제 4

아래 조건을 만족하는 타입을 만들고 싶습니다. `any` 부분에 들어갈 적절한 유틸 타입 조합은?

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  isActive: boolean;
  metadata?: Record<string, any>;
}

interface Admin extends User {
  permissions: string[];
  lastLogin: Date;
}

// Admin 타입에서 User의 선택적 속성들만 필수로 만들고,
// Admin 고유 속성들은 제외한 후 모든 속성이 필수인 타입을 만들고 싶습니다.
type ProcessedUser = any;
/*
  최종 타입의 속성 결과: 
  { 
    id: number; 
    name: string; 
    email: string; 
    age: number;
    isActive: boolean; 
    metadata: Record<string, any>; 
  }
*/
```

---
