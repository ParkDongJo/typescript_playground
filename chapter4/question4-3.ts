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


const birds: Bird[] = [{ name: 'cat', isBird: true }];
const dogs: Dog[] = [{ name: 'dog', isDog: true }];

// 아래 animals 의 타입을 제네릭을 활용하여 정의해주세요.
const animals: any = [...birds, ...dogs];

animals.map(animal => {
  if ('isBird' in animal) {
      return 'bird';
  }
  return 'dog';
});
