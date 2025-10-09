// 정확히 한개의 타입만 허용하는 타입

type ExtractOne<T> = {
  [K in keyof T]: {
    [P in K]: T[P]
  } & {
    [P in Exclude<keyof T, K>]?: never; // 선택형 never 타입
  }
}[keyof T]

type ExtractOneVideoFormat = ExtractOne<VedioFormatURLs>

function loadVedio4(format: ExtractOneVideoFormat) {
  throwError(format);
}


// 허용
loadVedio4({
  format360p: 'https://example.com/360p',
})

// 아래 상황은 에러가 발생
loadVedio4({
  format360p: 'https://example.com/360p',
  format720p: 'https://example.com/720p',
})
loadVedio4({});

// 아래와 같은 상황은 책에서 설명하는 선택적 never 타입이 적용되지 않는것 같다
// 아래 상황은 질문으로 올리면 좋을것 같다.
loadVedio4({
  format360p: 'https://example.com/360p',
  format720p: undefined,
})

// 나머지.. 내용들은 잘 모르겠다.
// AllOrNone 타입은 ... -? 라던지 이해가 안되는 코드들이 많다.