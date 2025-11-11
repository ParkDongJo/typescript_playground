
/*
  디바운스란 :
  사용자가 입력을 하고 있을 때, 입력이 끝날 때까지 함수를 호출하지 않고, 입력이 끝난 후 일정 시간 대기 후 함수를 호출하는 기법
*/
type Debounce<Fn extends (...args: any[]) => any> = (...args: Parameters<Fn>) => void;

const debounce = <Fn extends (...args: any[]) => any>(fn: Fn, wait: number): Debounce<Fn> => {
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



/*
  스로틀란 :
  사용자가 입력을 하고 있을 때, 일정 시간 간격으로 함수를 호출하는 기법
*/
type Throttle<Fn extends (...args: any[]) => any> = (...args: Parameters<Fn>) => void;

const throttle = <Fn extends (...args: any[]) => any>(fn: Fn, wait: number): Throttle<Fn> => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: any[]) => {
    if (!timeout) {
      fn(...args);
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
    }
};
