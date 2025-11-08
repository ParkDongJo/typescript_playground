type Merge<A extends object, B extends object> = {
  /*
    A & B 로 객체끼리 합집합 만들고, 그 합집합의 키를 순회하며 값을 추출
    집합에서의 & (인터섹션)은 두 객체의 합집합을 만든다.
    집합에서의 | (유니언)은 두 객체의 교집합을 만든다.
  */
  [K in keyof (A & B)]: (A & B)[K];
} & unknown;

export default Merge;
