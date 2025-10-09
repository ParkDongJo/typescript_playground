type BasicVedio = {
  title: string;
  author: string;
}

type Format320 = { urls: { format320p: string } }
type Format480 = { urls: { format480p: string } }
type Format720 = { urls: { format720p: string } }
type Format1080 = { urls: { format1080p: string } }

type Vedio = BasicVedio & (Format320 | Format480 | Format720 | Format1080)

type VedioUrls = Vedio['urls']

// 아래 형식은 never 타입이 나온다.
// 하지만 기대하는 바는 아래와 같다.
// type VedioFormatKeys = 'format320p' | 'format480p' | 'format720p' | 'format1080p'
type VedioFormatKeys = keyof VedioUrls 


type UnionToIntersection<T> =
  (T extends any ? (x: T) => any : never) extends (x: infer R) => any 
  ? R 
  : never;


type Intersected = UnionToIntersection<VedioUrls>

type IntersectedVedioFormatKeys = keyof Intersected
