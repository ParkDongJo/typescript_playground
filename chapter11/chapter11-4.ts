class Collect<T> {
  items: T[];

  constructor() {
    this.items = [];
  }

  addItem(item: T) {
    this.items.push(item);
  }
}

const nums = new Collect<number>();
nums.addItem(1);
nums.addItem('2');

const strs = new Collect<string>();
strs.addItem('1');
strs.addItem(2);

const unk = new Collect();
unk.addItem(1);
unk.addItem('2');


class CollectV2<T = never> {
  items: T[];

  constructor() {
    this.items = [];
  }

  addItem(item: T) {
    this.items.push(item);
  }
}

const neverV2 = new CollectV2();
// T는 never 타입이기 때문에 addItem 메서드에 전달할 수 없다.
// 즉 제네릭에 never 를 설정해 줌으로써 정확한 타입을 요구할 수 있다.
neverV2.addItem(1);
neverV2.addItem('2');


class Fuel {
  private currentFuel: number;
  private readonly maxFuel: number;

  constructor(maxFuel: number) {
    this.maxFuel = maxFuel;
    this.currentFuel = maxFuel;
  }

  use(amount: number): boolean {
    if (this.currentFuel < amount) {
      return false;
    }
    this.currentFuel -= amount;
    return true;
  }

  refill(amount: number): number {
    const space = this.maxFuel - this.currentFuel;
    const refillAmount = Math.min(amount, space);
    this.currentFuel += refillAmount;
    return refillAmount;
  }

  getCurrentFuel(): number {
    return this.currentFuel;
  }
}

// 사용 예시
const fuel = new Fuel(100);
console.log(fuel.getCurrentFuel()); // 100
console.log(fuel.use(30)); // true
console.log(fuel.getCurrentFuel()); // 70
console.log(fuel.refill(50)); // 50
console.log(fuel.getCurrentFuel()); // 100






