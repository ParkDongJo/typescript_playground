// 개개인의 정답

// lhc0506 ------------------------------------------------------------
// 평소에 사용하시는 방법
function groupMembers<T extends Member>(members: T[]): Record<T['kind'], T[]> {
  const groups = {} as Record<Member['kind'], T[]>
  for (const member of members) {
    groups[member.kind] = groups[member.kind] ?? [];
    groups[member.kind]?.push(member);
  }
  return groups;
}

// 정답 제출
type Group<Collection extends Record<string, any>, Selector extends keyof Collection> = {
  [x in Collection[Selector]]: Collection[]
}

type MemberGroup = Partial<Group<Member, 'kind'>>
function groupMembers<T extends Member>(members: T[]): MemberGroup {
  const groups = {} as MemberGroup
  for (const member of members) {
    groups[member.kind] = groups[member.kind] ?? [];
    groups[member.kind]?.push(member);
  }
  return groups;
}

// 정화 ------------------------------------------------------------
// 정답 제출
type GroupedMember = {
  [k in Member["kind"]]? : Member[]
} 

function groupMembers(members: Member[]): GroupedMember {
  const groups: GroupedMember = {}
  for (const member of members) {
    groups[member.kind] = groups[member.kind] ?? [];
    groups[member.kind]?.push(member);
  }
  return groups;
}


// JopopScript
// 정답 제출
type AAA<T> = T extends { kind: infer K }
    ? K extends string
        ? { [KK in K]: Extract<T, { kind: K }>[] }
        : never
    : never

type GroupedMember = AAA<Member>
const asdasd: GroupedMember = {
    gold: [ { kind: 'gold', name: '철수', point: 100, coupon: 10 } ],
    silver: [ { kind: 'silver', name: '영희', coupon: 10 } ],
    bronze: [ { kind: 'bronze', name: '영수' }, { kind: 'bronze', name: '민수' } ]
}
function groupMembers(members: Member[]): GroupedMember {
    const groups = {} as GroupedMember;
    for (const member of members) {
        groups[member.kind] = groups[member.kind] ?? [];
        groups[member.kind]?.push(member);
    }
    return groups;
}
