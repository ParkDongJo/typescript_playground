import { useState } from "react";

export const useToggle = (initialValue: boolean): [boolean, () => void] => {
  const [value, setValue] = useState(initialValue);

  const toggleValue = () => setValue((prevValue) => !prevValue);

  return [value, toggleValue];
  // 또는 const 로 배열이 아닌 튜플로 반환하게끔 단언한다.
  // return [value, toggleValue] as const; 
};
