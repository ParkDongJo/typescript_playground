type ToyBase_C4 = {
  name: string;
  description: string;
  minimumAge: number;
}

type BoardGame_C4 = ToyBase_C4 & {
  kind: "boardgame";
  players: number;
}

type Puzzle_C4 = ToyBase_C4 & {
  kind: "puzzle";
  pieces: number;
}

type Doll_C4 = ToyBase_C4 & {
  kind: "doll";
  meterial: "plush" | "plastic" | "wood" | "cloth";
}

type Bricks_C4 = ToyBase_C4 & {
  kind: "bricks";
  pieces: number;
  brand: string;
}

type Toy_C4 = BoardGame_C4 | Puzzle_C4 | Doll_C4 | Bricks_C4;

// type GroupedToys = {
//   [key in Toy_C4["kind"]]?: Toy_C4[];
// }

// function groupToys(toys: Toy_C4[]): GroupedToys {
//   const groups: GroupedToys = {}
//   for (const toy of toys) {
//     groups[toy.kind] = groups[toy.kind] ?? [];
//     groups[toy.kind]?.push(toy);
//   }
//   return groups;
// }

type GroupedToys = Partial<Group<Toy_C4, "kind">>;
type Group<
  Collection extends Record<string, any>, 
  Key extends keyof Collection
> = {
  [key in Collection[Key] extends string ? Collection[Key] : never]: Collection[];
}

function groupToys(toys: Toy_C4[]): GroupedToys {
  const groups: GroupedToys = {}
  for (const toy of toys) {
    groups[toy.kind] = groups[toy.kind] ?? [];
    groups[toy.kind]?.push(toy);
  }
  return groups;
}

const toys = groupToys([
  {
    name: "철수",
    description: "철수는 철수입니다.",
    minimumAge: 10,
    kind: "boardgame",
    players: 2,
  },
  {
    name: "영희",
    description: "영희는 영희입니다.",
    minimumAge: 10,
    kind: "puzzle",
    pieces: 100,
  },
  {
    name: "영희",
    description: "영희는 영희입니다.",
    minimumAge: 10,
    kind: "doll",
    meterial: "plush",
  },
])
