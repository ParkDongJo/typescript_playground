let myCar = {
  brand: "Toyota",
  model: "Corolla",
  year: 2020,
}
type CarType = typeof myCar;

const yourCar: CarType = {
  brand: "Toyota",
  model: "Corolla",
  year: 2020,
};

// [문제]
// as 를 사용하지 않고, 아래의 TS 오류를 해결해주세요
const changeCar = (from: CarType, to: CarType) => { 
  for (const key in from) {
    to[key] = from[key];
  }
}

changeCar(myCar, yourCar);

// const changeCar = <T extends CarType>(from: T, to: T) => {
//   let key: keyof T;
//   for (key in from) {
//     to[key] = from[key];
//   }
// }

// 스터디원의 답
// function copyProperty<K extends keyof CarType>(from: CarType, to: CarType, key: K): void {
//   to[key] = from[key];
// }

// const changeCar = (from: CarType, to: CarType) => {
//   const keys: (keyof CarType)[] = ['brand', 'model', 'year'];
//   keys.forEach((key) => copyProperty(from, to, key));
// };

// changeCar(myCar, yourCar);


// 스터디원의 답
// const changeCarImmutable = <T extends object>(from: T, to: T): T => {
//   return Object.assign({}, to, from);
// };

// const newCar = changeCarImmutable(myCar, yourCar);