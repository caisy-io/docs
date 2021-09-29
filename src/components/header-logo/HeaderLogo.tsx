import React from "react";
import { useContent } from "../../hooks/content";
import { SHeaderLogo } from "./styles/SHeaderLogo";
import { Img } from "@caisy/league";

export const HeaderLogo: React.FC = ({ ...props }) => {
  const c = useContent();

  if (!c.NavigationTop?.logo?.src) {
    return null;
  }

  return (
    <SHeaderLogo>
      <Img src={c.NavigationTop.logo.src} resolution={500} contain />
    </SHeaderLogo>
  );
};
