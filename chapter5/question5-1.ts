
/**
문제:
들어온 함수를 리턴하는 유틸 타입을 작성하세요.

예시:
입력: "const fn(num: number)"
출력: { a: string } & { b: number }

 */
// type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

// function fn(num : number) {
//   return num.toString(); 
// }


// [ 문제 ]
// 함수의 결과값의 타입을 뱉어주는
// MyReturnType 을 직접 정의해봅시다.

// any 를 써도 됩니다.

// function fn(num : number) {
//   return num.toString(); 
// }

// type MyReturnType<T extends (...args: any) => any> = // 여길 체워주세요

// type Result5 = MyReturnType<typeof fn>;

