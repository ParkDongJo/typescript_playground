
/*
   format("Hello {world:string} I'm {name:string}" {
     world: "Tomy",
     name: "Tilda"
    })
   를 만들고 싶다면
*/

type FormatObj<T extends string> =
  T extends `${string}{${infer Key}}${infer Rest}`
  ? { [k in Key]: any } & FormatObj<Rest>
  : {};

type C4_Test = FormatObj<'hey {a}{b}{c}'>;

// { [k in Key]: any } 에서 any가 아닌 받은 타입을 지정해야한다.

type FormatObjV2<T extends string> =
  T extends `${string}{${infer Key}:${infer Type}}${infer Rest}`
  ? { [k in Key]: Type } & FormatObjV2<Rest>
  : {};

type C4_Test2 = FormatObjV2<'hey {a:string}{b:number}{c:boolean}'>;

/*
  type Test2 = {
      a: "string";
  } & {
      b: "number";
  }

  하지만 위와 같이 type이 string 으로 선언된다. 이부분은을 실제 type 으로 변환해야한다.
*/

type MapFormatType = {
  string: string;
  number: number;
  boolean: boolean;
  [x: string]: any;
}

type StringType = MapFormatType['string'];
type NumberType = MapFormatType['number'];


// MapFormatType 을 한번 거치면 실제 타입처럼 사용할 수 있다.
type FormatObjV3<T extends string> =
  T extends `${string}{${infer Key}:${infer Type}}${infer Rest}`
  ? { [k in Key]: MapFormatType[Type] } & FormatObjV2<Rest>
  : {};

type C4_Test3 = FormatObjV3<'hey {a:string}{b:number}{c:boolean}'>;
type C4_Test3_1 = FormatObjV3<'hey man {a}'>;


// 여기서 좀 더 나아가면 {a} 처럼 타입을 지정하지 않은 경우에도 타입을 지정해줄 수 있어야 한다.

type FormatObjV4<T extends string> =
  T extends `${string}{${infer Key}}${infer Rest}`
  ? Key extends `${infer Key2}:${infer Type}`
    ? { [k in Key2]: MapFormatType[Type] } & FormatObjV4<Rest>
    : { [k in Key]: any } & FormatObjV4<Rest>
  : {};

type C4_Test4 = FormatObjV4<'hey {a}{b:number}{c}'>;
type C4_Test4_1 = FormatObjV4<'hey man {a}'>;





