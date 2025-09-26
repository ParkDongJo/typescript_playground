/*
    함수 오버로드

    다른 프로그래밍 언어와 달리
    함수 오버로드가 형식 시스템 수준에서만 동작
    실제 구현에는 아무런 영향을 미치지 않음

    구성
    - 가능한 함수 시그니처들 정의
    - 실제 함수 구현부

 */

type CallbackFn = () => void;

// 가능한 함수 시그니처들 정의
// 타입스크립트는 구현이전의 선언을 가능한 형식으로만 인식
function task(name: string, deps: string[]): void;
function task(name: string, callback: CallbackFn): void;
function task(name: string, deps: string[], callback: CallbackFn): void;

// 실제 함수 구현부
function task(name: string, param1: string[] | CallbackFn, param2?: CallbackFn): void {
    if (Array.isArray(param1)) {
        console.log('run task with deps');
    } else {
        console.log('run task');
    }
}


// 아래와 같이 하나의 애너테이션에 여러 개의 시그니처를 정의할 수 있음
type TaskFn = {
    (name: string, deps: string[]): void;
    (name: string, callback: CallbackFn): void;
    (name: string, deps: string[], callback: CallbackFn): void;
}

const taskFn: TaskFn = (name: string, param1: string[] | CallbackFn, param2?: CallbackFn): void => {
    if (Array.isArray(param1)) {
        console.log('run task with deps');
    } else {
        console.log('run task');
    }
}

task('task1', ['task2', 'task3']);
task('task2', () => {
    console.log('run task2');
});
task('task3', ['task4'], () => {
    console.log('run task3');
});