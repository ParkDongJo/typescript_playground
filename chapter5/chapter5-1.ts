type StringLabel = {
  name: string;
}

type NumberLabel = {
  id: number;
}

type Label = StringLabel | NumberLabel;

function createLabel(input: number): NumberLabel;
function createLabel(input: string): StringLabel;
function createLabel(input: StringLabel): StringLabel;
function createLabel(input: NumberLabel): NumberLabel;
function createLabel(input: string | StringLabel): StringLabel;
function createLabel(input: number | StringLabel): NumberLabel;
// 더 무궁무진하게 다형성을 대응 할 수 있다.
// 하지만... 모든 경우를 대응해야 한다.
function createLabel(input: 
  | string
  | StringLabel
  | number
  | NumberLabel
): Label {
  if (typeof input === 'number') {
    return { id: input };
  } else if (typeof input === 'string') {
    return { name: input };
  } else if ('id' in input) {
    return { id: input.id };
  } else {
    return { name: input.name };
  }
}

type GetLabel<T> = T extends string | StringLabel 
  ? StringLabel
  : T extends number | NumberLabel
    ? NumberLabel
    : never;

function createLabelV2<T extends number | string | StringLabel | NumberLabel>(input: T): GetLabel<T> 
function createLabelV2(input: number | string | StringLabel | NumberLabel): NumberLabel | StringLabel {
  if (typeof input === 'number') {
    return { id: input };
  } else if (typeof input === 'string') {
    return { name: input };
  } else if ('id' in input) {
    return { id: input.id };
  } else {
    return { name: input.name };
  }
}

