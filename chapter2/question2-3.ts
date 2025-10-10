

// 어떤 이유로 HTML 요소를 CustomData로 캐스팅해야 하는 특이한 상황
const div = document.createElement('div');
div.dataset.id = '42';
div.dataset.name = 'ChatGPT';

// 아래 타입단언은 불가능하다.
// 어떻게 고쳐야할까?
// 왜 그렇게 고쳐야할까?
// 제시한 방법도 어떤 한계가 있을까요?
const customData = div as any;


// 정답
/*
interface CustomData {
  id: number;
  name: string;
}
// const customData = div as HTMLDivElement;
const customData = div as unknown as CustomData;

console.log(customData.id);
console.log(customData.name);

*/