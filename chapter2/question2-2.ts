function addClass(this: HTMLAnchorElement | HTMLDivElement) {
  this.classList.add('active');
}

const links = document.querySelectorAll('.nav-link');

// listener 의 타입을 지정해주세요
function addListener(listener: any) {
  links.forEach((link) => {
    link.addEventListener('click', listener);
  });
}

addListener(addClass);

// 정답
/*
function addListener(listener: (this: ThisParameterType<typeof addClass>) => void) {
  links.forEach((link) => {
    link.addEventListener('click', listener);
  });
}

addListener(addClass);
*/
