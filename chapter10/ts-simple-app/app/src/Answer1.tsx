import React, { ComponentProps } from "react";

type CtaElements = 'button' | 'a';

type CtaProps<T extends CtaElements> = {
  as: T,
} & ComponentProps<T>;

function Cta<T extends CtaElements>({
  as: Component,
  children,
  ...props
}: CtaProps<T>) {
  return React.createElement(Component, props);
}