// 다음 코드에서 타입 에러가 발생합니다.
// 왜 에러가 발생하며, 어떻게 수정해야 할까요?

// 일단 문제 보류!!!
const uniqueKey = Symbol.for('unique');
const uniqueKey2 = Symbol.for('unique');
const uniqueKey3 = Symbol('unique');

const when = (key: unknown) => {
  if (key === uniqueKey) {
    console.log('uniqueKey');
  } else if (key === uniqueKey2) {
    console.log('uniqueKey2');
  } else {
    console.log('other symbol');
  }
}

when(uniqueKey);
when(uniqueKey2);
when(uniqueKey3);