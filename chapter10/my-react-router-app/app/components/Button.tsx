import { type ComponentProps, type JSX } from "react";

// 책에서는 JSX.IntrinsicElements["button"] 이라고 되어있는데, 이것은 뭐지?
// 이것은 버튼 요소의 모든 속성을 포함하는 타입입니다.
// 즉, 버튼 요소에 사용할 수 있는 모든 속성을 포함하는 타입입니다.
// 예를 들어, 버튼 요소에 사용할 수 있는 속성은 다음과 같습니다.
// - onClick
// - onMouseEnter
// - onMouseLeave
// - onMouseDown

//https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/71395
// https://www.typescriptlang.org/docs/handbook/jsx.html#intrinsic-elements

// ComponentProps 는 버튼 요소의 모든 속성을 포함하는 타입입니다.
type ButtonProps = ComponentProps<"button">;
// type ButtonProps = JSX.IntrinsicElements["button"];
export function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}

