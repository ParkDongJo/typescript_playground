import { useState, type JSX } from "react";

type Props = Omit<JSX.IntrinsicElements["input"], "value"> & { value: string };

function Input({
  value = "",
  onChange,
  ...allProps
}: Props) {
  return <input value={value} onChange={onChange} {...allProps} />;
}

export default function ComponentUsingInput() {
  const [value, setValue] = useState("");

  return <Input onChange={(e) => setValue(e.target.value)} />;
}

