// 문제:
// groupMembers함수를 구현하고, GroupedMembers 타입을 정의해주세요.

// 1. groupMembers 함수를 수정하여 그룹핑 기준을 동적으로 지정할 수 있도록 하세요.
// 2. 함수는 Member 배열을 받고, 그룹핑 기준은 kind를 기준으로 그룹핑해야 합니다.
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

type GroupedMembers = {
  [K in Member['kind']]: Extract<Member, { kind: K }>[];
};

function groupMembers(members: Member[]): GroupedMembers {
  const groups = {} as GroupedMembers;
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
/*
groupMembers 의 결과값은 아래와 같이 나옵니다. groupMembers 의 return 타입을 정의해주세요.
{
  gold: [ { kind: 'gold', name: '철수', point: 100, coupon: 10 } ],
  silver: [ { kind: 'silver', name: '영희', coupon: 10 } ],
  bronze: [ { kind: 'bronze', name: '영수' }, { kind: 'bronze', name: '민수' } ]
}
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
