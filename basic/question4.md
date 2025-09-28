# [문제 1]

```typescript
type FavoriteSport = "swimming" | "football";
type BallSport = "football" | "baseball";

// 아래 두 타입이 어떤 타입구조를 갖게될지 예측해주세요.
type Sport1 = FavoriteSport & BallSport;
type Sport2 = FavoriteSport | BallSport;
```

# [문제 2]

```typescript
interface Designer {
  name: string;
  sense: number;
}
interface Developer {
  name: string;
  skill: number;
}

// 아래 두 Worker 타입이 어떤 타입구조를 갖게될지 예측해주세요.
type Worker1 = Designer & Developer;
type Worker2 = Designer | Developer;
```

Worker1 = {
name: string/
sense: number;
skill: number;
}

Worker2 = {
name: string;
}
