import React from "react";
import { SNavigationTop } from "./styles/SNavigationTop";

interface INavigationTop {
  _?: null;
}

export const NavigationTop: React.FC<INavigationTop> = ({ ...props }) => {
  console.log(`NavigationTop props: `, props);
  return <SNavigationTop>{props.children}</SNavigationTop>;
};
