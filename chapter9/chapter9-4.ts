// as const를 통해서 readonly 배열 로 선언
const actions = ["CREATE", "READ", "UPDATE", "DELETE"] as const;

function execute(action: string) {
  // action 은 string 타입이지만, actions 는 readonly 배열 타입이다.
  // 따라서 action 은 actions 에 할당 할 수 없다.
  // 지금은 아래 ReadonlyArray를 추가해줘서 해결됨
  if (actions.includes(action)) {
    //
  } else {
    throw new Error("Invalid action");
  }
}

execute("CREATE");


// 위 오류의 문제는
// Array<string> 또는 ReadonlyArray<string> 라면 위의 에러가 발생하지 않지만
// ReadonlyArray<"CREATE" | "READ" | "UPDATE" | "DELETE"> 라면 위의 에러가 발생한다.
// 이는 타입 추론이 잘못되었기 때문이다.
// 타입 추론이 잘못되었기 때문에, 타입 추론을 올바르게 해줘야 한다.

// 아래와 같이 하게 된다면, 해결될 일이지만, 이건 include 를 쓸 이유가 없어진다.
// function execute(action: typeof actions[number]) {


// ReadonlyArray 를 재선언 하는 방법

// interface 는 이름 기준으로 중복 선언이 가능하다.
// 따라서 아래와 같이 재선언 하면, 위의 오류가 해결된다
// 이때,
// - 더 넒은 any 타입으로 searchElement 사용
// - searchElement is T 로 형식 찬방형을 사용하도록 지시한다.

// 즉 받는건 넓고, 내 뱉는 찬방형으로 좁힌다.
interface ReadonlyArray<T> {
  includes(searchElement: any, fromIndex?: number): searchElement is T;
}

// 하지만 위 작업은 searchElement 가 너무 넓은 타입이라서 문제가 있다.
// 아래와 같이 number 타입은 전혀 관련없는 타입임에도 통과가 됨으로 타입 검증이 무력화 된다.
function executeV2(action: number) {
  if (actions.includes(action)) {
    //
  } else {
    throw new Error("Invalid action");
  }
}

function includes<T extends U, U>(array: ReadonlyArray<T>, el: U): el is T {
  return array.includes(el as T);
}

function executeV3(action: number) {
  if (includes(actions, action)) {
    //
  } else {
    throw new Error("Invalid action");
  }
}
