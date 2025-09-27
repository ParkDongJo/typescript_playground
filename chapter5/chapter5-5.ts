/*
  자료구조나 객체를 저장 또는 전달할 수 있는 형식으로 변환하는 작업을 직렬화 라고 한다.
*/

type Laptop = {
  name: string;
  serialNumber: number;
  memory: {
    total: number;
    used: number;
  };
  run: (program: string) => string;
  serialize: () => string;
}


type NestSerialization<T> = {
  [K in keyof T]: T[K] extends object ? Serialize<T[K]> : T[K];
}

/*
 아래는 재귀적으로 돌아간다.
 타입스크립트는 형식 재귀를 특정 깊이까지 처리할 수 있다. 이때 NestSerialization 탈출 조건이 존재하는데,
 조건부 만족을 하지 않았을 경우 T[K]로 결과값을 내뱉는것이 그 탈출 조건이다.
 */
// type Serialize<T> = NestSerialization<RemoveByKey<T, Function>>;

/*
  객체 내부에서 serialize() 가 가능해야한다고 했을 시
  아래와 같이 타입을 정의할 수 있다.

  infer 을 통해서 R 값을 추론하여 추출하고
  이렇게 추출한 R 값을 반환하는 형식으로 정의할 수 있다.
*/
// https://velog.io/@from_numpy/TypeScript-infer
type Serialize<T> = T extends { serialize: () => infer R } ? R : NestSerialization<RemoveByKey<T, Function>>;

class Serializer {
  constructor() {}
  serialize<T>(obj: T): Serialize<T> {
    const ret: Record<string, any> = {};

    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        ret[key] = this.serialize(obj[key]);
      } else if (typeof obj[key] === "function") {
        ret[key] = obj[key];
      }
    }
    return ret as Serialize<T>;
  }
}

const laptop: Laptop = {
  name: "MacBook Pro",
  serialNumber: 1234567890,
  memory: {
    total: 16,
    used: 8,
  },
  run: (program: string) => `Running ${program}...`,
  serialize: () => new Serializer().serialize(laptop),
}

/*
  infer 와 관련해서 더 확실한 예제는 ReturnType 일 것이다.
  infer 을 통해서 반환값을 추론하여 반환하는 형식으로 정의할 수 있다.
*/
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

function fn(num : number) {
  return num.toString(); 
}

const value : MyReturnType<typeof fn> = "Hello";   // MyReturnType<T> 이용
console.log(value); //Hello
