
/*
  HTML 의 모든 요소들을 직접 선언해서 할 수도 있지만
*/
// type AllElements = {
//   a: HTMLAnchorElement;
//   button: HTMLButtonElement;
//   div: HTMLDivElement;
//   input: HTMLInputElement;
//   select: HTMLSelectElement;
//   textarea: HTMLTextAreaElement;
// }

/*
lib.dom.ts 에 정의 된 HTMLElementTagNameMap 를 가져다 쓸 수도 있다.
다만, tag 에서는 svg 나, 커스텀한 tag 에서는 my-img 와 같은 형식으로 쓰기도 한다.
그래서 이를 모두 포함하기 위해 아래와 같이 재선을 해준다.
*/
type AllElements = HTMLElementTagNameMap & {
  [x in `${string}-${string}`]: HTMLElement;
}

// function createElement<T extends keyof AllElements>(
//   tag: T,
//   props?: Partial<AllElements[T]>
// ): AllElements[T] {
//   const elem = document.createElement(tag as string) as AllElements[T];
//   return Object.assign(elem, props);
// }

// as 어서션을 제거하기 위해 오버로드를 활용
function createElement<T extends keyof AllElements>(
  tag: T,
  props?: Partial<AllElements[T]>
): AllElements[T];
function createElement(tag: string, props?: Partial<HTMLElement>): HTMLElement {
  const elem = document.createElement(tag);
  return Object.assign(elem, props);
}

const a = createElement("a", { href: "https://example.com" });
const myElement = createElement("my-img", { alt: "my element" });
const testElement = createElement("testElement");
