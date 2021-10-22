import { Img, RichTextRenderer } from "@caisy/league";
import React, { Fragment } from "react";
import { ArticleHeadline } from "./ArticleHeadline";
import { SArticle } from "./styles/SArticle";
import { SArticleBody } from "./styles/SArticleBody";

interface IArticle {
  article: any;
}

export const Article: React.FC<IArticle> = ({ ...props }) => {
  return (
    <SArticle className="scroll-container">
      <SArticleBody>
        <ArticleHeadline>{props.article?.headline ?? "Page"}</ArticleHeadline>
        {props.article?.body?.map((bodyItem: any) => {
          if (bodyItem?.text?.content) {
            return (
              <Fragment key={bodyItem.id}>
                {" "}
                <RichTextRenderer node={bodyItem.text} />{" "}
              </Fragment>
            );
          }
          if (bodyItem?.src) {
            return (
              <Fragment key={bodyItem.id}>
                {" "}
                <Img resolution={1920} src={bodyItem.src} alt={bodyItem.description} />
              </Fragment>
            );
          }
          return null;
        })}
      </SArticleBody>
    </SArticle>
  );
};
