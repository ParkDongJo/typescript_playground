import React, { useState, type JSX } from "react";

type OnlyRequired<T, K extends keyof T> = Required<Pick<T, K>> & Partial<Omit<T, K>>;

type ControlledProps = OnlyRequired<
  JSX.IntrinsicElements["input"],
  "value" | "onChange"
> & {
  defaultValue?: never;
};

type UncontrolledProps = Omit<
  JSX.IntrinsicElements["input"],
  "value" | "onChange"
> & {
  defaultValue: string;
  value?: never;
  onChange?: never;
};

type InputProps = ControlledProps | UncontrolledProps;

function InputV2({ ...allProps }: InputProps) {
  return <input {...allProps} />;
}

function ControlledInputV2() {
  const [value, setValue] = useState("");

  return <InputV2 value={value} onChange={(e) => setValue(e.target.value)} />;
}

function UnControlledInputV2() {
  return <InputV2 defaultValue="Hello" />;
}

export { ControlledInputV2, UnControlledInputV2 };
