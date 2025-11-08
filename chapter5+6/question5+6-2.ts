/*
  스로틀란 :
  사용자가 입력을 하고 있을 때, 일정 시간 간격으로 함수를 호출하는 기법
*/
export const throttle = (fn: (...args: any[]) => any, wait: number) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: any[]) => {
    if (!timeout) {
      fn(...args);
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
    }
};
