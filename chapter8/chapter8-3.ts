type Remap<T> = {
    [K in keyof T]: T[K];
};


type SetOptionalRemap<T, K extends keyof T = keyof T> = Remap<Partial<Pick<T, K>> & Omit<T, K>>

type SetOptionalRemaped = SetOptionalRemap<Picture, '작품소개' | '작품주소'>


type SubTitles = {
  active: boolean;
  title: string;
  content: string;
}

type Settings = {
  mode: 'dark' | 'light';
  playbackSpeed: number;
  subTitles: SubTitles;
}

type SettingsRemaped = Remap<Settings>

type DeepRemap<T> = T extends object ? {
  [K in keyof T]: DeepRemap<T[K]>;
} : T;

type DeepRemaped2 = DeepRemap<Settings>


