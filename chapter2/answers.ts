// // 문제 2-1

// // 정화님
// type LogLevel = 'info' | 'warn' | 'error'

// function logMessage(param1 : string , param2? : string ) {
//    //에러메시지 하나를 받는 경우
//    if(param2 === undefined) {
//      console.log(param1)
//    } else {
//    // 로그레벨과 에러메시지를 받는 경우
//      if(param1 as LogLevel) {
//         console.log(${param1}| ${param2})
//      } 
//    }
// }

// // lhc0506
// function logMessage(message: string): void;
// function logMessage(level: LogLevel, message: string): void;

// function logMessage(param1: string | LogLevel, param2?: string): void {

//   if (param2 === undefined) {
//     console.log(param1);
//   } else {
//     console.log(param1, param2);
//   }

// }


// // hamin_developer
// function logMessage(param1: string | LogLevel, param2?: string): void {
//   if (typeof param1 === 'string' && !param2) {
//       // 첫 번째 형태: 에러 메시지 하나를 받는 경우
//       console.log(Error: ${param1});
//   } else if (typeof param1 === 'string' && param2) {
//       // 두 번째 형태: 로그 레벨과 에러 메시지를 받는 경우
//       console.log([${param1.toUpperCase()}] ${param2});
//   } else {
//       throw new Error('Invalid parameters');
//   }
// }


// // 문제 2-2

// // 정화님
// // listener 의 타입을 지정해주세요
// function addListener(listener: (this: HTMLAnchorElement| HTMLDivElement) => void) {
//   links.forEach((link) => {
//     link.addEventListener('click', listener);
//   });
// }

// addListener(addClass);

// // lhc0506
// type Listener = (this: HTMLAnchorElement | HTMLDivElement, event: Event) => void;

// function addListener(listener: Listener) {
//   links.forEach((link) => {
//     link.addEventListener('click', listener);
//   });
// }

// // hamin_developer



// // 문제 2-3

// // 정화님
// (customData.dataset as CustomData).id = '33';
// (customData.dataset as CustomData).name = 'hahaha'
// // Type 'string' is not assignable to type 'number'.

// // lhc0506
// const customData = div as unknown as CustomData;

// // hamin_developer


