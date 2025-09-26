// 일반적으로 enum은 한계가 있다.
// js 로 변환되면서 비효율적인 코드로 변환된다
enum FoodEnum {
  Pizza = 0,
  Rice = 1,
  Salad = 2,
}

const enum ConstFoodEnum {
  Pizza = 0,
  Rice = 1,
  Salad = 2,
}

const Food = {
  Pizza: 0,
  Rice: 1,
  Salad: 2,
} as const;

type FoodType = (typeof Food)[keyof typeof Food];

function getFood(food: FoodType) {
  if (food === Food.Pizza) {
    return "Pizza";
  }
}

