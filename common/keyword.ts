// -?
// -readonly
// -optional
export type DeepRequired<T> = {
  [P in keyof T]-?: DeepRequired<T[P]>;
};

// -infer

// -extends

// -keyof

// -in

// -is

// -as

// -never

// -unknown

// -any


