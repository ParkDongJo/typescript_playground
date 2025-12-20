import { forwardRef, type JSX } from "react";

type ClickableListProps<T> = {
  items: T[];
  onSelect: (item: T) => void;
};

export default function ClickableListInner<T>(
  props: ClickableListProps<T>,
  ref: React.ForwardedRef<HTMLUListElement>
) {
  return (
    <ul ref={ref} {...props}>
      {props.items.map((item, i) => (
        <li key={i}>
          <button type="button" onClick={() => props.onSelect(item)}>
            Select
          </button>
          {item}
        </li>
      ))}
    </ul>
  )
}