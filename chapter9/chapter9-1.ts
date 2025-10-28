type Book = {
  title: string;
  author: string;
};

function printBook(book: Book) {
  Object.keys(book).forEach((key) => {
    // book[key] 에서 ts 에러 발생, key 가 string 이라서 book[key] 에서 에러 발생
    // 평소에는 아래와 같이 타입 단언으로 해결할 것 같음
    console.log(`${key}: ${book[key as keyof Book]}`);
  });
}

type ComicBook = Book & {
  characters: string[];
};

// 만약 Object.keys(book) 의 반환값이 keyof Book[]이라면 위와 같은 ts 에러는 발생하지 않음
// 하지만 이 부분은 문제가 있는데
function printBookV2(book: Book) {
  (Object.keys(book) as (keyof Book)[]).forEach((key) => {
    console.log(`${key}: ${book[key]}`);
  });
}
const comicBook: ComicBook = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  characters: ["Jay Gatsby", "Daisy Buchanan", "Tom Buchanan"],
};
// 아래 경우가 문제없이 실행된다.
// 이는 런타임에서도 문제를 유발할 수 있는데, characters 같은 경우는 Book 타입에 없는 key 이다.
// 하지만 Object.keys(book) 반환값이 Book 타입이라는 가정은 Book 이 아닌 타입일 때는
// 존재하지 않는 characters 키를 참조하게 되어 런타임에서 undefined 를 출력하게 될 수도 있다.
function printBookV2_2(book: Book) {
  (Object.keys(book) as (keyof Book)[]).forEach((key) => {
    // 아래 부분이 통과된다.
    console.log(`${key}: ${comicBook[key]}`);
  });
}


// 타입 가드를 사용하는 방법도 있다.
// 타입 가드를 통해, 타입검증이 되었기 때문에 타입 단언보다는 더 안전하다.
function isKey<T extends object>(x: T, k: PropertyKey): k is keyof T {
  return k in x;
}
function printBookV3(book: Book) {
  Object.keys(book).forEach((key) => {
    if (isKey(book, key)) {
      console.log(`${key}: ${book[key]}`);
    }
  });
}

// Object.keys가 아니라 for-in 문으로 풀어내는 방법도 있다.
// 이 경우는 제네릭을 지정해주는 것 만으로도 key 의 타입을 정확하게 추론해낼 수 있다.
function printBookV4<B extends Book>(book: B) {
  for (const key in book) {
    console.log(`${key}: ${book[key]}`);
  }
}

function printBookV4_2<B extends Book>(book: B) {
  for (const key in book) {
    // 아래와 같이 ts 에러가 발생한다.
    console.log(`${key}: ${comicBook[key]}`);
  }
}





