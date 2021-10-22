import { TabPanel, Tabs } from "@caisy/league";
import React, { useState, FC } from "react";
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
import { useRouter } from "next/router";
import { SNavigationTopInnerContainer } from "./styles/SNavigationTopInnerContainer";

export const NavigationTop: FC = ({ ...props }) => {
  const { NavigationTop } = useContent();
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(
    NavigationTop?.items?.findIndex((item) => item && item["slug"] == router?.query?.slug?.[0]) || 0,
  );

  return (
    <SNavigationTop>
      <SNavigationTopInnerContainer>
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
            <HeaderSearch NavigationTop={NavigationTop} setCurrentTab={setCurrentTab} />
          </SNavigationTopSearch>
        </SNavigationTopFirstLine>
        <SNavigationTopTabsLine>
          <Tabs
            initialValue={currentTab}
            onChange={(newValue) => {
              if (newValue != currentTab) {
                setCurrentTab(newValue);
              }
            }}
          >
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
      </SNavigationTopInnerContainer>
    </SNavigationTop>
  );
};
