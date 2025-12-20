import { useToggle } from "~/hooks/useToggle";

export default function Toggle() {
  const [value, toggleValue] = useToggle(false);

  return (
  //  Type 'boolean | (() => void)' is not assignable to type 'MouseEventHandler<HTMLButtonElement> | undefined'.
  // Type 'boolean' is not assignable to type 'MouseEventHandler<HTMLButtonElement>'.ts(2322)
    <button onClick={toggleValue}>
      {value ? "ON" : "OFF"}
    </button>
  );
}
