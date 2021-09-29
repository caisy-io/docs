import React, { useContext } from "react";
import { IGenArticle_Connection, IGenNavigationTop, IGenCategory_Connection } from "../constants/gen_types";

interface IContentContext {
  allCategory?: IGenCategory_Connection;
  allArticle?: IGenArticle_Connection;
  NavigationTop?: IGenNavigationTop;
}

export const ContentContext = React.createContext<IContentContext>({});

export const useContent = (): IContentContext => {
  const c = useContext(ContentContext);
  return c;
};
