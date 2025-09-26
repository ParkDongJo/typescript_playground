interface Animal {
  name: string;
}

interface Bird extends Animal {
  isBird: true;
}

interface Dog extends Animal {
  isDog: true;
}

type MyPet = Bird | Dog;

// type Animals = (Bird | Dog)[];

// type Concat<T extends any[], U extends any[]> = [...T, ...U]


const birds: Bird[] = [{ name: 'cat', isBird: true }];
const dogs: Dog[] = [{ name: 'dog', isDog: true }];

type Contat<T extends MyPet[], U extends MyPet[]> = [...T, ...U];

// 아래 animals 의 타입을 제네릭을 활용하여 정의해주세요.
const animals: any = [...birds, ...dogs];

animals.map(animal => {
  if ('isBird' in animal) {
      return 'bird';
  }
  return 'dog';
});
