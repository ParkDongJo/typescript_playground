// 인덱스 시그니처 사용하기

type Dictionary = {
  [key: string]: string;
};

const dict: Dictionary = {};

/*
  key 가 string 하위 타입으로 정의한 경우
  ?로 선택적 키 임을 명시할 수 있다.
  하지만 위와 같이 바로 : string 은 선택적인 표현이 불가능 하다.
*/
type Dictionary2 = {
  [key in string]?: string;
};

const dict2: Dictionary2 = {};

