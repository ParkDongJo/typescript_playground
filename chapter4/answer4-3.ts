const birds: Bird[] = [{ name: 'cat', isBird: true }];
const dogs: Dog[] = [{ name: 'dog', isDog: true }];

type Contat<T extends MyPet[], U extends MyPet[]> = [...T, ...U];

// 아래 animals 의 타입을 제네릭을 활용하여 정의해주세요.
const animals: Contat<Bird[], Dog[]> = [...birds, ...dogs];
