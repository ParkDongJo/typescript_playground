
type CallbackFn = () => void;

function task(name: string, params2: string[]) : void
function task(name: string, callbak: CallbackFn) : void
function task(name: string, params2: string[], callback: CallbackFn): void
function task(name: string, params2: string[] | CallbackFn, callback?: CallbackFn): void {
}

// task(
//   'task1', 
//   () => {
//     console.log('task1 done');
//   }, 
//   () => {
//     console.log('task1 done');
//   }
// );

// task('task1', ['param1', 'param2']);

// task('task1', () => {
//   console.log('task1 done');
// });

// task('task1', ['param1', 'param2'], () => {
//   console.log('task1 done');
// });


/*
 문제: logMessage 함수를 만들 것입니다.
 이 함수는 두 가지 형태의 파라미터를 받을 수 있습니다.
 param1 은 string 타입이거나 LogLevel 타입이 될 수 있습니다.
 param2 는 string 타입이거나 undefined 가 될 수 있습니다.


 로그레벨은 info, warn, error 세 가지 중 하나입니다.

 예제
 1. 에러메시지 하나를 받는 경우
 logMessage('Hello');
 2. 로그 레벨과 에러메시지를 받는 경우
 logMessage('warn', 'Hello');
*/


type LogLevel = 'info' | 'warn' | 'error';

function logMessage(message: string): void;
function logMessage(level: LogLevel, message: string): void;
function logMessage(param1: string | LogLevel, param2?: string): void {
  if (typeof param1 === 'string') {
    console.log(`[INFO]: ${param1}`);
  } else {
    console.log(`[${param1}]: ${param2}`);
  }
}

/*
  위 코드는 function logMessage(param1: string | LogLevel, param2?: string): void 이렇게만 사용하면 안되는 이유를 말해주세요.
*/


