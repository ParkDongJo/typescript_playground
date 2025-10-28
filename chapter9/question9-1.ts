// as const를 통해서 readonly 배열로 선언
const colors = ["RED", "GREEN", "BLUE"] as const;
const colorMap: Record<typeof colors[number], string> = {
  RED: "불타는",
  GREEN: "차분함",
  BLUE: "차가운",
};

function matchColor(color: string) {
  if (colors.indexOf(color) !== -1) {
    return colorMap[color];
  } else {
    return "기타";
  }
}
matchColor("RED");

// matchColor 의 문제를 정의하고 해결하는 방법을 작성해주세요.





// 정답
// 해결 방법 중 하나는 직접 타입을 좁히는 함수를 만드는 것이다.
function hasColor<T extends U, U>(array: ReadonlyArray<T>, el: U): el is T {
  return array.indexOf(el as T) !== -1;
}

function matchColorV2(color: string) {
  if (hasColor(colors, color)) {
    // 여기서는 color가 "RED" | "GREEN" | "BLUE"로 좁혀진다
    return colorMap[color];
  } else {
    return "기타";
  }
}