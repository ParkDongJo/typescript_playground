abstract class FilterBasic {
  constructor(private property: string) {}
  some() {}
  abstract filter(): void;
}

class FilterA extends FilterBasic {
  filter(): void {
    console.log('filter');
  }
}

class FilterB extends FilterBasic {
  filter(): void {
    console.log('filter');
  }
}

declare const filterMap: Map<string, typeof FilterBasic>;

filterMap.set('A', FilterA);
filterMap.set('B', FilterB);

// 추상 클래스의 인스턴스를 만들수 없다고 에러가 뜬다.
const filterA = filterMap.get('A');
if (filterA) {
  const obj: FilterBasic = new filterA('A');
}
// 추상 클래스는
// 형식(형식 네임스페이스)과 실제 구현(값 네임스페이스)을 혼합한다.


// 객체를 만드는데 필요한 형식
interface FilterConstructor {
  // 반환값은 IFilter
  new (property: string): IFilter;
}

// 객체 자체의 형식
interface IFilter {
  some(): void;
  filter(): void;
}

// new 키워드를 사용하고자 한다면,
// new 키워드를 정의한 형식을 사용해야 한다.
declare const filterMapV2: Map<string, FilterConstructor>;

filterMapV2.set('A', FilterA);
filterMapV2.set('B', FilterB);


const filterA2 = filterMapV2.get('A');
if (filterA2) {
  const obj2: IFilter = new filterA2('A');
}
