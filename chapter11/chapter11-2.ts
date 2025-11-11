type Point = {
  x: number;
  y: number;
}

class ShapeBasic {
  private _points: Point[];

  constructor(points: Point[]) {
    this._points = points;
  }

  get points(): Point[] {
    return this._points;
  }

  render(): string {
    return `Shape with ${this._points.length} points`;
  }
}

class CircleImpl extends ShapeBasic {
  // override 키워드를 사용하여 부모 클래스의 메서드를 재정의 할 수 있다.
  // 물론 override 없이도 재정의 할 수 있지만, 만약 부모 클래스에서 render 의 이름을 바꾸거나 ㅈ삭제를 하면
  // 아래 자식 클래스의 render 들은 컴파일 ts 에러가 발생한다.
  override render(): string {
    return `Circle with ${this.points.length} points`;
  }
}