// Pick, Omit, Extract, Exclude 를 각각 설명해주세요.

// SetOptionaled, OnlyRequireded, SetRequireded 를 각각 설명해주세요.

// Remap 과 DeepRemap 을 각각 설명해 주세요.

// ExtractOne 을 설명해 주세요.





/*
  아래 예시를 만족하는 2개의 유틸타입을 작성해주세요.
  1. 특정 속성들을 읽기 전용으로 만드는 타입
  2. 두 타입의 공통 속성만 추출하는 타입

  예시를 참고해주세요.
*/

type Company = {
  id: number;
  name: string;
  email: string;
  address?: string;
};

type Employee = {
  id: number;
  name: string;
  department: string;
  salary: number;
}


// 예시
// email을 읽기 전용으로
type ReadonlyEmail = SetReadonly<Company, 'email'>;
/*
type ReadonlyEmail = {
  id: number;
  name: string;
  email: string;
  address?: string;
}
*/

// 두 타입의 공통 속성 추출
type CommonFields = CommonProperties<Company, Employee>;
/*
type CommonFields = {
  id: number;
  name: string;
}
*/

// 정답
type SetReadonly<T, K extends keyof T> = Remap<Omit<T, K> & Readonly<Pick<T, K>>>;

type CommonProperties<T, U> = Remap<Pick<T, Extract<keyof T, keyof U>>>;
