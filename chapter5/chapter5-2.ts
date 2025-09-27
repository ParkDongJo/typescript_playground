type ElementList = {
  addClass: (className: string) => ElementList;
  removeClass: (className: string) => ElementList;
  on: (event: string, callback: () => void) => ElementList;
  length: number;
  [x: number]: HTMLElement;
}

type ElementListKeys = keyof ElementList;
// addClss | removeClass | on | length | numbar 로 해석됨

type JustString<T> = T extends string ? T : never;

type JustStringKeys = JustString<keyof ElementList>;

type SafeAccess =  Pick<ElementList, JustStringKeys>;
