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

type Grouping<
  Collection extends Record<string, any>, 
  Key extends keyof Collection
> = {
  [key in Collection[Key] extends string ? 
    Collection[Key] : 
    never
  ]: Collection[];
}
type GroupedMembers = Partial<Grouping<Member, "kind">>;

type GroupByDiscriminator<T extends { [K in D]: string }, D extends keyof T> = {
    [K in T[D]]: Extract<T, Record<D, K>>[]
}
type GroupedMembersV2 = GroupByDiscriminator<Member, "kind">

function groupMembers(members: Member[]): GroupedMembers {
  const groups = {} as GroupedMembers;
  for (const member of members) {
    groups[member.kind] = groups[member.kind] ?? [];
    groups[member.kind]?.push(member);
  }
  return groups;
}
