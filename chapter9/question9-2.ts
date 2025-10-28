export const matchString = (str: string) => {
  return /^[a-z]+$/i.test(str);
};

matchString("hello");



