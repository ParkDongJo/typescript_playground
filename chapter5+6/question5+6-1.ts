
/*
  디바운스란 :
  사용자가 입력을 하고 있을 때, 입력이 끝날 때까지 함수를 호출하지 않고, 입력이 끝난 후 일정 시간 대기 후 함수를 호출하는 기법
*/
const debounce = (fn: (...args: any[]) => any, wait: number) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: any[]) => {
    // 이전 timeout이 있다면 취소
    if (timeout) {
      clearTimeout(timeout);
    }

    // wait 만큼 대기 후 fn 호출
    timeout = setTimeout(() => {
      fn(...args);
    }, wait);
  };
};