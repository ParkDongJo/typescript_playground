type Entry = {

}

/*
  유니언에 string & {} 를 추가하면 개발 중일때, 자동 완성 정보를 얻을 수 있다.
*/
type ContentType = "post" | "page" | "category" | "tag" | string & {};

type Content = {
  id: number;
  title: string;
  
}

function retrieve(content: ContentType): Entry[] {
  return []
}

retrieve("page")

