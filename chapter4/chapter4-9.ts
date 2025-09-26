type Route = {
  path: string;
  component: string;
}

function myRouter<T extends Route>(routes: readonly T[]) {
  return {
    navigate(path: T['path']) {
      history.pushState({}, '', path);
    }
  }
}

const router = myRouter([
  { path: '/home', component: 'Home' }, 
  { path: '/about', component: 'About' }
])

// path 의 T['path'] 는 string 으로 추론된다.
// 넘어간 path 가 string 타입으로 넘어간다.
// 정확한 타입이 지정되지 않고, 일부 정보를 잃어버린다.
router.navigate('/home')
router.navigate('/faq')


const routerV2 = myRouter([
  { path: '/home', component: 'Home' }, 
  { path: '/about', component: 'About' }
] as const)

// const 로 컨텍스트를 적용해서 넘기면, path 로 넘어가는 '/home' 은  특정 readonly 타입으로 넘어가게 된다.
routerV2.navigate('/home')
routerV2.navigate('/faq')


// const 로 컨텍스트를 적용해서 넘기면, path 로 넘어가는 '/home' 은  특정 readonly 타입으로 넘어가게 된다.
// 제네릭 쪽에 const 를 붙임으로써, 불필요하게 as const 를 쓰지 않아도 된다.
function my2Router<const T extends Route>(routes: readonly T[]) {
  return {
    navigate(path: T['path']) {
      history.pushState({}, '', path);
    }
  }
}

const routerV3 = my2Router([
  { path: '/home', component: 'Home' }, 
  { path: '/about', component: 'About' }
])

// const로 따로 지정하지 않아도 된다.
routerV3.navigate('/home')
routerV3.navigate('/faq')
