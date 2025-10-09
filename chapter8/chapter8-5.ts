
type URL = string;
type VedioFormatURLs = {
  format360p: URL;
  format720p: URL;
  format1080p: URL;
  format4k: URL;
}

function throwError(formats: Partial<VedioFormatURLs>) {
  if (!formats.format360p && !formats.format720p && !formats.format1080p && !formats.format4k) {
    throw new Error('At least one format is required');
  }
}

function loadVedio(formats: Partial<VedioFormatURLs>) {
  // 최소 하나 이상의 포멧이 있어야 함
  if (!formats.format360p && !formats.format720p && !formats.format1080p && !formats.format4k) {
    throw new Error('At least one format is required');
  }
}

loadVedio({
  format360p: 'https://example.com/360p',
  format720p: 'https://example.com/720p',
  format1080p: 'https://example.com/1080p',
});

// 아래와 같은 상황은 형식은 허용하고 있지만,
// 실제로 호출하면 에러가 발생함
loadVedio({});

// 아래와 같은 형식으로 타입을 제한할 수 있음
type AvailableVideoFormats = 
| {
  format360p: URL;
}
| {
  format720p: URL;
}
| {
  format1080p: URL;
}
| {
  format4k: URL;
}

function loadVedio2(formats: AvailableVideoFormats) {
  // 최소 하나 이상의 포멧이 있어야 함
  throwError(formats);
}

loadVedio2({
  format360p: 'https://example.com/360p',
});

// 아래 상황은 에러가 발생
loadVedio2({});

type AvailableVideoFormats2 = {
  [K in keyof VedioFormatURLs]: K
}

type AvailableVideoFormats3 = {
  [K in keyof VedioFormatURLs]: {
    [P in K]: VedioFormatURLs[P]
  }
}

// version 4 부터 원했던 AvailableVideoFormats 을 얻었다.
type AvailableVideoFormats4 = {
  [K in keyof VedioFormatURLs]: {
    [P in K]: VedioFormatURLs[P]
  }
}[keyof VedioFormatURLs]

// 위 version 4 의 타입의 재사용성을 높인다면
type Split<T> = {
  [K in keyof T]: {
    [P in K]: T[P]
  }
}[keyof T];

function loadVedio3(formats: Split<VedioFormatURLs>) {
  throwError(formats);
}

// 옵셔널한 타입을 허용하면서도
loadVedio3({
  format360p: 'https://example.com/360p',
});

// 아래 상황은 에러가 발생
loadVedio3({});

