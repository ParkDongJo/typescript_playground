import { forwardRef, type JSX } from "react";

type ButtonProps = JSX.IntrinsicElements["button"];

const ButtonForward = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    return <button type="button" ref={ref} {...props}>
      {props.children}
    </button>
});

export default ButtonForward;
