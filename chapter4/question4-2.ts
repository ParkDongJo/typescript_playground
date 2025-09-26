// 문제 설명:
// 장난감 그룹핑 시스템을 확장하여 다양한 기준으로 그룹핑할 수 있도록 하세요.

// 1. groupToys 함수를 수정하여 그룹핑 기준을 동적으로 지정할 수 있도록 하세요.
// 2. 함수는 장난감 배열과 그룹핑 기준이 될 키를 받아 해당 기준으로 그룹핑해야 합니다.
// 3. 타입 안전성을 보장하면서 유연하게 사용할 수 있어야 합니다.

type GoldMember = {
  kind: "gold";
  name: string;
  point: number;
  coupon: number;
}
type SilverMember = {
  kind: "silver";
  name: string;
  coupon: number;
  point?: never;
}
type BronzeMember = {
  kind: "bronze";
  name: string;
  point?: never;
  coupon?: never;
}
type Member = GoldMember | SilverMember | BronzeMember;

/*
groupedByPoint 의 결과값은 아래와 같이 나옵니다. groupedByPoint 의 return 타입을 정의해주세요.
{
  gold: [ { kind: 'gold', name: '철수', point: 100, coupon: 10 } ],
  silver: [ { kind: 'silver', name: '영희', coupon: 10 } ],
  bronze: [ { kind: 'bronze', name: '영수' }, { kind: 'bronze', name: '민수' } ]
}
*/

type Grouping<
  Collection extends Record<string, any>, 
  Key extends keyof Collection
> = {
  [key in Collection[Key] extends string ? Collection[Key] : never]: Collection[];
}
type GroupedMembers = Partial<Grouping<Member, "kind">>;

function groupMembers(members: Member[]): GroupedMembers {
  const groups = {} as GroupedMembers;
  for (const member of members) {
    groups[member.kind] = groups[member.kind] ?? [];
    groups[member.kind]?.push(member);
  }
  return groups;
}
const groupedMembers = groupMembers([
  {
    kind: "gold",
    name: "철수",
    point: 100,
    coupon: 10,
  },
  {
    kind: "silver",
    name: "영희",
    coupon: 10,
  },
  {
    kind: "bronze",
    name: "영수",
  },
  {
    kind: "bronze",
    name: "민수",
  },
]);

console.log(groupedMembers);

// Record<string, Member[]>
/*
[ 정 답 ]
type Grouping<
  Collection extends Record<string, any>, 
  Key extends keyof Collection
> = {
  [key in Collection[Key] extends string ? Collection[Key] : never]: Collection[];
}
type GroupedMembers = Partial<Grouping<Member, "kind">>;
*/


function loopGroupedMembers(key: keyof GroupedMembers, groupedMembers: GroupedMembers) {
  groupedMembers[key]?.map((member: Member) => {
    console.log(member.point);
  });
}

loopGroupedMembers("gold", groupedMembers);




// type GroupByDiscriminator<T extends { [K in D]: string }, D extends keyof T> = {
//   [K in T[D]]: Extract<T, Record<D, K>>[]
// }

// type GroupedMemberV2 = GroupByDiscriminator<Member, "kind">

// const groupedMembersV2 = groupMembers([
//   {
//     kind: "gold",
//     name: "철수",
//     point: 100,
//     coupon: 10,
//   },
//   {
//     kind: "silver",
//     name: "영희",
//     coupon: 10,
//   },
// ]);

// function loopGroupedMembersV2(key: keyof GroupedMemberV2, groupedMembers: GroupedMemberV2) {
//   groupedMembers[key]?.map((member: GoldMember) => {
//     console.log(member.point);
//   });
// }
