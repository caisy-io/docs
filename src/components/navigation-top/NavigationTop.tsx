import { Input, Dropdown, IconSearch, TabPanel, Tabs } from "@caisy/league";
import React from "react";
import { HeaderHeadline } from "../header-headline/HeaderHeadline";
import { HeaderLogo } from "../header-logo/HeaderLogo";
import { SNavigationTop } from "./styles/SNavigationTop";
import { SNavigationTopFirstLine } from "./styles/SNavigationTopFirstLine";
import { SNavigationTopSHeaderLeftContainer } from "./styles/SNavigationTopSHeaderLeftContainer";
import { SNavigationTopTabsLine } from "./styles/SNavigationTopTabsLine";
import Link from "next/link";
import { SNavigationTopSearch } from "./styles/SNavigationTopSearch";
import { HeaderSearch } from "../header-search/HeaderSearch";
import { useContent } from "../../hooks/content";
interface INavigationTop {
  _?: null;
}

export const NavigationTop: React.FC<INavigationTop> = ({ ...props }) => {
  const { NavigationTop } = useContent();
  console.log(`useContent NavigationTop props: `, NavigationTop);

  return (
    <SNavigationTop>
      <SNavigationTopFirstLine>
        <Link href="/" shallow={true}>
          <a>
            <SNavigationTopSHeaderLeftContainer>
              <HeaderLogo />
              <HeaderHeadline />
            </SNavigationTopSHeaderLeftContainer>
          </a>
        </Link>
        <SNavigationTopSearch>
          <HeaderSearch />
        </SNavigationTopSearch>
      </SNavigationTopFirstLine>
      <SNavigationTopTabsLine>
        <Tabs initialValue={0}>
          {NavigationTop?.items?.map((item: any) => {
            if (!item?.slug) return null;
            return (
              <TabPanel
                key={item.id}
                style={{ padding: 0 }}
                title={
                  <Link href={`/${item.slug ?? ""}`} shallow={true}>
                    <a>{item.title ?? ""}</a>
                  </Link>
                }
              ></TabPanel>
            );
          })}
        </Tabs>
      </SNavigationTopTabsLine>
      {props.children}
    </SNavigationTop>
  );
};
