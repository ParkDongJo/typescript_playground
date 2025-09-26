// enum 은 컴파일 이후 비효율적은 결과코드로 변환됩니다.
// enum 을 대신해서 타입정의를 다시 해봅시다.
enum Sport {
  Soccer = 0,
  Basketball = 1,
  Baseball = 2,
}
function getFavoriteSport(sport: Sport) {
  if (sport === Sport.Soccer) {
    return "Soccer";
  }
}

/*
[ 정 답 ]
const Sport = {
  Soccer: 0,
  Basketball: 1,
  Baseball: 2,
} as const;
type SportType = (typeof Sport)[keyof typeof Sport];
*/




