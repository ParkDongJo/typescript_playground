function addClass(this: HTMLAnchorElement | HTMLDivElement) {
  this.classList.add('active');
}

const links = document.querySelectorAll('.nav-link');

// listener 의 타입을 지정해주세요
function addListener<T>(listener: (this: ThisParameterType<typeof T>) => void) {
  links.forEach((link) => {
    link.addEventListener('click', listener);
  });
}

addListener(addClass);

type FnParams = ThisParameterType<typeof addClass>;
type WithoutThis = OmitThisParameter<typeof addClass>;
