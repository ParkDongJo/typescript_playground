type FnObj = Record<string, (...args: any[]) => any>;

type MapFnProps<FunctionObj extends FnObj> = {
  [K in keyof FunctionObj]: ReturnType<FunctionObj[K]>;
};

// ThisType 을 활용해서 this를 올바르게 정의
type Options<Data, Computed extends FnObj, Methods> = {
  data?: (this: {}) => Data;
  computed?: Computed & ThisType<Data>;
  methods?: Methods & ThisType<Data & MapFnProps<Computed> & Methods>;
}

/*
TypeScript에서 declare 키워드는 변수, 함수, 클래스, 인터페이스, 모듈 등을 다른 곳에서 정의된 것을 선언하거나 재정의하는 데 사용됩니다.
*/
declare function create<Data, Computed extends FnObj, Methods>(
  options: Options<Data, Computed, Methods>
): Data & MapFnProps<Computed> & Methods;

const instance = create({
  data() {
    return {
      firstName: 'Park',
      lastName: 'Jong-hwa',
    }
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`
    }
  },
  methods: {
    hi() {
      alert(this.fullName.toLowerCase())
    },
    log() {
      console.log(this.fullName)
    }
  }
})
