type URLList = {
  [key: string]: URL;
};

const language = { 
  de: new URL('https://example.com/de'), 
  en: new URL('https://example.com/en') 
}
/*
  URLList 로만 제한하면 key 가 string 이라서 타입 제한이 너무 넓음
*/
// function fetchFile(urls: URLList, key: string) {
//   return fetch(urls[key])
//     .then((res) => res.json())
//     .catch(() => {
//       return null;
//     });
// }

function fetchFile<List extends URLList>(urls: List, key: keyof List) {
  return fetch(urls[key])
    .then((res) => res.json())
    .catch(() => {
      return null;
    });
}

function fetchFiles<List extends URLList, Keys extends keyof List>(
  urls: List, 
  keys: Keys[]
): Promise<[Keys, any]>[] {
  return keys.map((key) => 
    fetch(urls[key])
      .then((res) => res.json())
      .then((data) => [key, data])
  );
}

console.log(
  fetchFile(language, 'de'));
console.log(
  fetchFile(language, 'it'));
console.log(
  fetchFiles(language, ['de', 'en']));
console.log(
  fetchFiles(language, ['de', 'it']));
