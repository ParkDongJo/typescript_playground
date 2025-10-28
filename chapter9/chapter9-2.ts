type Pet = {
  name: string;
  age: number;
};

type Response = {
  json(): Promise<any>;
};
async function fetch<T>(url: string): Promise<T> {
  return {} as T;
}

// 근데 이때 Pet[] 타입선언은 사실 제대로된 타입이 아니다.
// 만약 Pet[] 이 없다면, any 로 잡힌다. 이는 런타임에서 오류를 발생 시킬 수 있다.
// 안전한 타입이 아니다.
async function fetchPets() {
  const ppl: Pet[] = await fetch<Response>("https://api.example.com/pets").then((res) =>
    res.json()
  );
  return ppl;
}
fetchPets();

// 위 문제점을 어느정도 해결하려면 json() 의 Promise<> 타입에서 any 대신 unknown 을 사용하면 된다.
// unknown 은 모든 타입을 넘길 수 있지만, 타입을 할당 할 수 없다.
type PetResponse = {
  json(): Promise<unknown>;
};
async function fetchPetsV2(): Promise<PetResponse> {
  const ppl: Pet[] = await fetch<PetResponse>("https://api.example.com/pets").then((res) =>
    res.json()
  );
  return ppl;
}

