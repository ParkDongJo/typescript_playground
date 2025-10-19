// 첫번째 방법
class Balance {
  private _nominal: void = undefined;
  value: number;

  constructor(value: number) {
    this.value = value;
  }
}

class AccountNumber {
  private _nominal: void = undefined;
  value: string;

  constructor(value: string) {
    this.value = value;
  }
}

const account = new AccountNumber("1234567890");
const balance = new Balance(10000);

const addByBalance = (b1: Balance, b2: Balance): Balance => {
  return new Balance(b1.value + b2.value);
}

console.log(addByBalance(balance, account));


// 두번째 방법

type Credits = number & { _kind: "credits" };
type Debits = number & { _kind: "debits" };

const addByCredits = (c1: Credits, c2: Credits): Credits => {
  return (c1 + c2) as Credits;
}

console.log(addByCredits(10000, 20000));