// class 관련된 모든 사항을 적용해볼 수 있도록 해보자.
// 조건을 확인하고 필요한 코드들을 추가해주세요.

// 문제의 의도는 클래스에 접근자, 제네릭, 상속, 오버라이딩 등등의 기법들을 적절하게 활용하여, 재사용성 높은 코드를 만들어 내는지 입니다.

/*
type FuelType = 'gasoline' | 'electric';

abstract class MCar {
  public brand: string;
  public model: string;
  public fuelType: FuelType;
  protected currentFuel: number;
  protected maxFuel: number = 100;
  private _price: number;

  constructor(brand: string, model: string, fuelType: FuelType, price: number = 0) {
    this.brand = brand;
    this.model = model;
    this.fuelType = fuelType;
    this._price = price;
    this.currentFuel = 0;
  }

  // 조건 >
  // drive() 함수와 stop() 함수는 Car 클래스 내부에 구현하지 마세요.
  // 그 외 나머지 필요한 함수들을 구현해주세요.

  movingNoise(): void {
    if (this.fuelType === 'gasoline') {
      console.log(`Vroom Vroom....`);
    } else if (this.fuelType === 'electric') {
      console.log(`Whirring~~~~`);
    }
  };
}


// 자식 class조건 >
// drive() 함수와 stop() 함수는 자식 클래스에서 필수로 구현되어야 합니다.
// info() 함수는 필수가 아니지만 재정의를 했다면, 부모클래스에서 변경됐을 시 자식 클래스에서 빌드 오류를 인지 할 수 있어야 합니다.
// refill() 함수는 자식 클래스에서 필수로 구현되어야 합니다.
class PastCar {
  drive(): void {
    console.log(`${this.brand} ${this.model} is driving...`);
  }
  stop(): void {
    console.log(`${this.brand} ${this.model} is stopping...`);
  }

  refill(input: number): void {}
}

class FutureCar {
  drive(): void {
    console.log(`${this.brand} ${this.model} is driving...`);
  }
  stop(): void {
    console.log(`${this.brand} ${this.model} is stopping...`);
  }

  override info(): string {
    return `${this.brand} ${this.model} 미래차`;
  }

  refill(input: number): void {}
}

*/



// 정답

type FuelType = 'gasoline' | 'electric';

interface MVehicle {
  drive(): void;
  stop(): void;
}

abstract class MCar<F extends FuelType> {
  public brand: string;
  public model: string;
  public fuelType: F;
  protected currentFuel: number;
  protected maxFuel: number = 100;
  private _price: number;

  constructor(brand: string, model: string, fuelType: F, price: number = 0) {
    this.brand = brand;
    this.model = model;
    this.fuelType = fuelType;
    this._price = price;
    this.currentFuel = 0;
  }

  get price(): number {
    return this._price;
  }

  public movingNoise(): void {
    if (this.fuelType === 'gasoline') {
      console.log(`Vroom Vroom....`);
    } else if (this.fuelType === 'electric') {
      console.log(`Whirring~~~~`);
    }
  };

  public abstract refill(input: number): void;

  public info(): string {
    return `${this.brand} ${this.model}`;
  }
}

class PastCar extends MCar<'gasoline'> implements MVehicle {
  drive(): void {
    console.log(`${this.brand} ${this.model} is driving...`);
  }
  stop(): void {
    console.log(`${this.brand} ${this.model} is stopping...`);
  }
  refill(input: number): void {
    this.currentFuel = input;
  }
}

class FutureCar extends MCar<'electric'> implements MVehicle {
  drive(): void {
    console.log(`${this.brand} ${this.model} is driving...`);
  }
  stop(): void {
    console.log(`${this.brand} ${this.model} is stopping...`);
  }

  override info(): string {
    return `${this.brand} ${this.model} 미래차`;
  }

  refill(input: number): void {
    if (input > this.maxFuel) {
      console.error('최대 충전량을 초과했습니다.');
    }
    this.currentFuel = input;
  }
}



// 결론 >
// 위에 로그 찍는 코드들이 모두 완성되면, 아래의 코드가 정상 동작해야합니다.
const oldCar = new PastCar('현대', '소나타', 'gasoline', 800000);
oldCar.refill(200);
// 아무런 반응 없음
console.log(oldCar.movingNoise());
// Vroom Vroom....
console.log(oldCar.price);
// 출력: 800000
console.log(oldCar.info());
// 출력: 현대 소나타


const newCar = new FutureCar('현대', '아이오닉', 'electric', 10000000);
newCar.refill(200);
// 에러 발생: 최대 충전량을 초과했습니다.
console.log(newCar.movingNoise());
// Whirring~~~~
console.log(newCar.price);
// 출력: 10000000
console.log(newCar.info());
// 출력: 현대 아이오닉 미래차