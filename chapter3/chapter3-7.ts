class MyError extends Error {
    constructor(message: string) {
        super(message);
    }
}

const somePromise = () => {
    return new Promise((resolve, reject) => {
        if (Math.random() > 0.5) {
            resolve('success');
        } else {
            reject(new MyError('error'));
        }
    })
}

somePromise().then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
})

/*
    error 는 어떤 형식이든 가능하다
    처리하고자 하는 Error를 Error 클래스로 구현한 다음
    instanceof 나 typeof 으로 타입 가드를 하는 것이 좋다
*/
async function runSomePromise() {
    try {
        const result = await somePromise();
        console.log(result);
    } catch (error) {
        if (error instanceof MyError) {
            console.log(error.message);
        } else {
            console.log('unknown error');
        }
    }
}

runSomePromise();

// 또는 아래 예제처럼 헬퍼 함수를 만들어서 
// is Keyword 를 사용하여 형식을 확인 할 수도 있다.
const isAxiosError = (payload: unknown): error is AxiosError => {
    return payload !== null && payload?.isAxiosError;
}



