// asserts 키워드

function check<T>(obj: T): obj is T & { checked: true } {
  (obj as T & { checked: boolean }).checked = true;
  return true;
}

const obj = { checked: false };
check(obj);

// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions
/*
asserts condition says that whatever gets passed into the condition parameter must be true if the assert returns (because otherwise it would throw an error).
That means that for the rest of the scope, that condition must be truthy.
As an example, using this assertion function means we do catch our original yell example.
*/
function assertString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Value is not a string");
  }
}

function joinSlash(a: unknown, b: unknown): string {
  assertString(a);
  // assertString(b);

  // a 가 unknown 으로 넘어왔지만 a 가 string 이라는 것을 보장받았기 때문에 a 를 string 으로 추론할 수 있음
  // b 는 실제로 string 이지만 string 이라는 것을 보장받지 못했기 때문에 오류 발생
  return a.toUpperCase() + "/" + b.toUpperCase();
}

// console.log(joinSlash(1, "b"));

console.log(joinSlash("a", "b"));


// asserts 키워드 를 활용해서 아래 checkT 함수를 개선할 수 있다.

const personJ = {
  name: "John",
  age: 30,
}

function checkT<T>(obj: T): obj is T & { checked: true } {
  (obj as T & { checked: boolean }).checked = true;
  return true;
}

console.log(personJ.checked);
if (checkT(personJ)) {
  console.log(personJ.checked);
}

const personD = {
  name: "Dron",
  age: 30,
}


function checkT2<T>(obj: T): asserts obj is T & { checked: true } {
  (obj as T & { checked: boolean }).checked = true;
  // 여기서 return true 를 하지 않더라도, checkT2 를 통해서 true/false 로 추론된다.
}

console.log(personD.checked);
checkT2(personD);
console.log(personD.checked);


