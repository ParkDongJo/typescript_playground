type Picture = {
    화가: string;
    작품명: string;
    작품소재: string;
    작품크기: string;
    작품가격: number;
    작품소개: string;
    작품주소: string;
}

type Partialed = Partial<Picture>;

type SetOptional<T, K extends keyof T = keyof T> = Partial<Pick<T, K>> & Omit<T, K>

type SetRequired<T, K extends keyof T = keyof T> = Required<Pick<T, K>> & Omit<T, K>

type OnlyRequired<T, K extends keyof T = keyof T> = Required<Pick<T, K>> & Partial<Omit<T, K>>


type SetOptionaled = SetOptional<Picture, '작품소개' | '작품주소'>

type OnlyRequireded = OnlyRequired<Picture, '작품소개' | '작품주소'>

type SetRequireded = SetRequired<Picture, '작품소개' | '작품주소'>

