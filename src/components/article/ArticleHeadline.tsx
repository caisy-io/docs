import React from "react";
import { SArticleHeadline } from "./styles/SArticleHeadline";

interface IArticleHeadline {}

export const ArticleHeadline: React.FC<IArticleHeadline> = ({ ...props }) => {
  return <SArticleHeadline>{props.children}</SArticleHeadline>;
};
