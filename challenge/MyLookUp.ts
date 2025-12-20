interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type MyLookUp<T, K> = T extends { type: K } ? T : never;

type MyResult = MyLookUp<Cat | Dog, 'cat'>;

type MyResult2 = MyLookUp<Cat | Dog, 'dog'>;