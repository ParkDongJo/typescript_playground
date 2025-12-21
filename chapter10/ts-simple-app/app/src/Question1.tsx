/*
  any 를 제거해주세요.
*/

import { ComponentProps } from "react";

type CtaElements = 'button' | 'a';

type CtaProps<T extends CtaElements> = {
  as: T,
} & ComponentProps<T>;

function Cta<T extends CtaElements>({
  as: Component,
  ...props
}: CtaProps<T>) {
  return <Component {...(props as any)} />;
}