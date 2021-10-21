import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Theme, BodyLayout } from "@caisy/league";
import { NavAside } from "../components/nav-aside/NavAside";
import { NavigationTop } from "../components/navigation-top/NavigationTop";
import { GSBaseDocs } from "../constants/styles/global-style";
import { ContentContext } from "../hooks/content";

const App = ({ Component, pageProps }: AppProps) =>  {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=fallback"
          rel="stylesheet"
        />
      </Head>
      <Theme>
        <ContentContext.Provider
          value={{
            allArticle: pageProps.allArticle,
            NavigationTop: pageProps.NavigationTop,
            allCategory: pageProps.allCategory,
          }}
        >
          <GSBaseDocs />
          <NavigationTop />
          <BodyLayout>
            <NavAside></NavAside>
            <Component {...pageProps} />
          </BodyLayout>
        </ContentContext.Provider>
      </Theme>
    </>
  );
}

export default App;