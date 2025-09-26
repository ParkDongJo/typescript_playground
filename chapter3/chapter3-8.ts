type SelectBase = {
  options: string[];
}

/*
  쓰이지 않는 속성에대해
  - 옵셔널 설정
  - never 설정
*/
type SingleSelect = SelectBase & {
  value1: string;
  value2?: never;
  values?: never;
}

type MultiSelect = SelectBase & {
  value1?: never;
  value2?: number;
  values: never;
}

type TripleSelect = SelectBase & {
  value1?: never;
  value2?: never;
  values: string[];
}

/*
  만약 이런 설정을 해줘야하는 속성이 더 많다면
  kind 속성으로 구분하는 방법이 더 나을 수 있다.
*/

type Select = SingleSelect | MultiSelect | TripleSelect;

function getSelect(select: Select) {
  if ("value1" in select) {
    return select.value1;
  } else if ("value2" in select) {
    return select.value2;
  } else {
    return select.values;
  }
}

getSelect({
  options: ["1", "2", "3"],
  value1: "1",
});

getSelect({
  options: ["1", "2", "3"],
  value2: 2,
});

getSelect({
  options: ["1", "2", "3"],
  values: ["1", "2", "3"],
});

getSelect({
  options: ["1", "2", "3"],
  value1: "1",
  value2: 2,
});

