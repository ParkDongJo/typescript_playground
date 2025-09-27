

// type Extract<T, U> = T extends U ? T : never;

type Vehicle = {
  name: string;
  wheels: number;
}

type Car = Vehicle & {
  kind: "car";
  doors: number;
}
type Bike = Vehicle & {
  kind: "bike";
}
type Truck = Vehicle & {
  kind: "truck";
  doors: number;
  cargo: string;
}

type VehicleType = Car | Bike | Truck;


type ExtractedCar = Extract<VehicleType, { kind: "car" }>;
/*
Extract 내부 동작
type ExtractedCar = {
  Car extends { kind: "car" } ? Car : never |
  Bike extends { kind: "car" } ? Bike : never |
  Truck extends { kind: "car" } ? Truck : never
}

하위 형식 여부를 판단해서
type ExtractedCar = Car | never | never

로 축소된다.
유니언 동작을 수행하면 never 는 제거된다. 결국

type ExtractedCar = Car
만 남게 된다.
*/


type GroupBy<
  Collection extends Record<string, any>,
  Key extends keyof Collection
> = {
  [K in Collection[Key]]: Extract<Collection, { [P in Key]: K }>[];
}

type GroupedVehicles = Partial<GroupBy<VehicleType, "kind">>;
/*
위 타입은 아래와 같이 계산된다.
type GroupedVehicles = {
  car?: Car[];
  bike?: Bike[];
  truck?: Truck[];
}
*/

function groupVehicles(Vehicles: VehicleType[]): GroupedVehicles {
  return Vehicles.reduce((group, toy) => {
    const key = toy.kind;
    const groupKey = key as keyof GroupedVehicles;
    group[groupKey] = (group[groupKey] || []).concat(toy);
    return group;
  }, {} as GroupedVehicles);
}

const groupedVehicles = groupVehicles([
  { name: "car", kind: "car", wheels: 4, doors: 4 },
  { name: "bike", kind: "bike", wheels: 2 },
  { name: "truck", kind: "truck", wheels: 6, doors: 2, cargo: "cargo" },
]);

function loop(key: keyof GroupedVehicles, groupedVehicles: GroupedVehicles) {
  groupedVehicles[key]?.forEach(vehicle => {
    console.log(vehicle.kind);
  });
}
/*
 형식을 설계한 방식 덕분에 안전하게 group[key] 로 접근하고 배열에 value 를 푸시할 수 있다.
*/
