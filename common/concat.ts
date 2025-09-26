type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T;

type A = MyAwaited<Promise<string>>;

type B = MyAwaited<Promise<Promise<number>>>;

type C = MyAwaited<number>;

type D = MyAwaited<Promise<string | number>>;



interface Animal {
    name: string;
}

interface Bird extends Animal {
    isBird: true;
}

interface Dog extends Animal {
    isDog: true;
}


type Animals = (Bird | Dog)[];

// type Concat<T extends any[], U extends any[]> = [...T, ...U]


const birds: Bird[] = [{ name: 'cat', isBird: true }];
const dogs: Dog[] = [{ name: 'dog', isDog: true }];

type Contat<T extends MyPet[], U extends MyPet[]> = [...T, ...U];

const animals: Contat<Bird[], Dog[]> = [...birds, ...dogs];

animals.map(animal => {
    if ('isBird' in animal) {
        return 'bird';
    }
    return 'dog';
});


type MyPetUnion = Bird | Dog;
type MyPetIntersection = Bird & Dog;

const myPet2: MyPetUnion = { name: 'cat', isBird: true, isDog: true };
const myPet3: MyPetIntersection = { name: 'cat', isBird: true };


// { name: 'cat', isBird: true, isDog: true }에 대한 타입 호환을 막기위해 여러가지 방법이 있음
// 1번째 방법

// interface Bird extends Animal {
//     isBird: true;
//     isDog: never;
// }
// interface Dog extends Animal {
//     isDog: true;
//     isBird: never;
// }

// 2번째 방법
// 유틸리티 타입을 사용하여 제약 추가
type ExclusivePet<T> = T extends Bird
  ? T & { isDog?: never }
  : T extends Dog
  ? T & { isBird?: never }
  : never;

type MyPetUnionV2 = ExclusivePet<Bird | Dog>;

const myPet2s: MyPetUnion[] = [
    { name: 'cat', isDog: true },
    { name: 'dog', isBird: true },
    { name: 'cat', isBird: true, isDog: true },
];

const myPet3s: MyPetIntersection[] = [
    { name: 'cat', isDog: true },
    { name: 'dog', isBird: true },
    { name: 'cat', isBird: true, isDog: true },
    { name: 'dog', isBird: true, isDog: true },
];

type Dog2 = "dog2" | "cat3"
type Cat2 = "cat2" | "cat3"

type Animal2 = Dog2 | Cat2

type Animal3 = Dog2 & Cat2
