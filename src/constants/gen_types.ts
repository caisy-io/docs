export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSONObject: any;
};

export type IGenQuery = {
  __typename?: "Query";
  ArticleTag?: Maybe<IGenArticleTag>;
  allArticleTag?: Maybe<IGenArticleTag_Connection>;
  Text?: Maybe<IGenText>;
  allText?: Maybe<IGenText_Connection>;
  NavigationTop?: Maybe<IGenNavigationTop>;
  Category?: Maybe<IGenCategory>;
  allCategory?: Maybe<IGenCategory_Connection>;
  NavigationItem?: Maybe<IGenNavigationItem>;
  allNavigationItem?: Maybe<IGenNavigationItem_Connection>;
  Article?: Maybe<IGenArticle>;
  allArticle?: Maybe<IGenArticle_Connection>;
  Asset?: Maybe<IGenAsset>;
  allAsset?: Maybe<IGenAsset_Connection>;
  Caisy_Document?: Maybe<IGenCaisy_Document>;
};

export type IGenQueryArticleTagArgs = {
  id: Scalars["ID"];
  locale?: Maybe<Scalars["String"]>;
};

export type IGenQueryAllArticleTagArgs = {
  locale?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  sort?: Maybe<Array<Maybe<IGenArticleTag_Sort>>>;
  where?: Maybe<Array<Maybe<IGenArticleTag_Where>>>;
};

export type IGenQueryTextArgs = {
  id: Scalars["ID"];
  locale?: Maybe<Scalars["String"]>;
};

export type IGenQueryAllTextArgs = {
  locale?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  sort?: Maybe<Array<Maybe<IGenText_Sort>>>;
  where?: Maybe<Array<Maybe<IGenText_Where>>>;
};

export type IGenQueryNavigationTopArgs = {
  locale?: Maybe<Scalars["String"]>;
};

export type IGenQueryCategoryArgs = {
  id: Scalars["ID"];
  locale?: Maybe<Scalars["String"]>;
};

export type IGenQueryAllCategoryArgs = {
  locale?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  sort?: Maybe<Array<Maybe<IGenCategory_Sort>>>;
  where?: Maybe<Array<Maybe<IGenCategory_Where>>>;
};

export type IGenQueryNavigationItemArgs = {
  id: Scalars["ID"];
  locale?: Maybe<Scalars["String"]>;
};

export type IGenQueryAllNavigationItemArgs = {
  locale?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  sort?: Maybe<Array<Maybe<IGenNavigationItem_Sort>>>;
  where?: Maybe<Array<Maybe<IGenNavigationItem_Where>>>;
};

export type IGenQueryArticleArgs = {
  id: Scalars["ID"];
  locale?: Maybe<Scalars["String"]>;
};

export type IGenQueryAllArticleArgs = {
  locale?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  sort?: Maybe<Array<Maybe<IGenArticle_Sort>>>;
  where?: Maybe<Array<Maybe<IGenArticle_Where>>>;
};

export type IGenQueryAssetArgs = {
  id: Scalars["ID"];
  locale?: Maybe<Scalars["String"]>;
};

export type IGenQueryAllAssetArgs = {
  locale?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  sort?: Maybe<Array<Maybe<IGenAsset_Sort>>>;
  where?: Maybe<Array<Maybe<IGenAsset_Where>>>;
};

export type IGenQueryCaisy_DocumentArgs = {
  id?: Maybe<Scalars["String"]>;
  locale?: Maybe<Scalars["String"]>;
};

export type IGenArticleTag = {
  __typename?: "ArticleTag";
  id?: Maybe<Scalars["ID"]>;
  key?: Maybe<Scalars["String"]>;
  _meta?: Maybe<IGenCaisyDocument_Meta>;
};

export type IGenCaisyDocument_Meta = {
  __typename?: "CaisyDocument_Meta";
  locale?: Maybe<Scalars["String"]>;
  locales?: Maybe<Array<Maybe<Scalars["String"]>>>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  id?: Maybe<Scalars["ID"]>;
};

export type IGenArticleTag_Connection = {
  __typename?: "ArticleTag_Connection";
  edges?: Maybe<Array<Maybe<IGenArticleTag_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type IGenArticleTag_ConnectionEdge = {
  __typename?: "ArticleTag_ConnectionEdge";
  node?: Maybe<IGenArticleTag>;
  cursor?: Maybe<Scalars["String"]>;
};

export type IGenPageInfo = {
  __typename?: "PageInfo";
  hasNextPage?: Maybe<Scalars["Boolean"]>;
  hasPreviousPage?: Maybe<Scalars["Boolean"]>;
  startCursor?: Maybe<Scalars["String"]>;
  endCursor?: Maybe<Scalars["String"]>;
};

export type IGenArticleTag_Sort = {
  key?: Maybe<Order>;
};

export enum Order {
  Asc = "ASC",
  Desc = "DESC",
}

export type IGenArticleTag_Where = {
  key?: Maybe<IGenCaisyField_String_Where>;
  OR?: Maybe<Array<Maybe<IGenArticleTag_Where>>>;
  AND?: Maybe<Array<Maybe<IGenArticleTag_Where>>>;
};

export type IGenCaisyField_String_Where = {
  neq?: Maybe<Scalars["String"]>;
  eq?: Maybe<Scalars["String"]>;
  contains?: Maybe<Scalars["String"]>;
};

export type IGenText = {
  __typename?: "Text";
  id?: Maybe<Scalars["ID"]>;
  text?: Maybe<Scalars["JSONObject"]>;
  title?: Maybe<Scalars["String"]>;
  _meta?: Maybe<IGenCaisyDocument_Meta>;
};

export type IGenText_Connection = {
  __typename?: "Text_Connection";
  edges?: Maybe<Array<Maybe<IGenText_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type IGenText_ConnectionEdge = {
  __typename?: "Text_ConnectionEdge";
  node?: Maybe<IGenText>;
  cursor?: Maybe<Scalars["String"]>;
};

export type IGenText_Sort = {
  text?: Maybe<Order>;
  title?: Maybe<Order>;
};

export type IGenText_Where = {
  text?: Maybe<IGenCaisyField_String_Where>;
  title?: Maybe<IGenCaisyField_String_Where>;
  OR?: Maybe<Array<Maybe<IGenText_Where>>>;
  AND?: Maybe<Array<Maybe<IGenText_Where>>>;
};

export type IGenNavigationTop = {
  __typename?: "NavigationTop";
  id?: Maybe<Scalars["ID"]>;
  title?: Maybe<Scalars["String"]>;
  logo?: Maybe<IGenAsset>;
  items?: Maybe<Array<Maybe<IGenNavigationTop_Items>>>;
  _meta?: Maybe<IGenCaisyDocument_Meta>;
};

export type IGenNavigationTopLogoArgs = {
  locale?: Maybe<Scalars["String"]>;
};

export type IGenNavigationTopItemsArgs = {
  locale?: Maybe<Scalars["String"]>;
};

export type IGenAsset = {
  __typename?: "Asset";
  id?: Maybe<Scalars["ID"]>;
  src?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  originalName?: Maybe<Scalars["String"]>;
  author?: Maybe<Scalars["String"]>;
  keywords?: Maybe<Scalars["String"]>;
  originType?: Maybe<Scalars["String"]>;
  copyright?: Maybe<Scalars["String"]>;
  dominantColor?: Maybe<Scalars["String"]>;
  _meta?: Maybe<IGenCaisyDocument_Meta>;
};

export type IGenAssetSrcArgs = {
  crop?: Maybe<Scalars["String"]>;
};

export type IGenNavigationTop_Items = IGenNavigationItem | IGenCaisy_Field_Document_NotFound;

export type IGenNavigationItem = {
  __typename?: "NavigationItem";
  id?: Maybe<Scalars["ID"]>;
  title?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  items?: Maybe<Array<Maybe<IGenNavigationItem_Items>>>;
  _meta?: Maybe<IGenCaisyDocument_Meta>;
};

export type IGenNavigationItemItemsArgs = {
  locale?: Maybe<Scalars["String"]>;
};

export type IGenNavigationItem_Items = IGenCategory | IGenCaisy_Field_Document_NotFound;

export type IGenCategory = {
  __typename?: "Category";
  id?: Maybe<Scalars["ID"]>;
  title?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  items?: Maybe<Array<Maybe<IGenCategory_Items>>>;
  _meta?: Maybe<IGenCaisyDocument_Meta>;
};

export type IGenCategoryItemsArgs = {
  locale?: Maybe<Scalars["String"]>;
};

export type IGenCategory_Items = IGenArticle | IGenCaisy_Field_Document_NotFound;

export type IGenArticle = {
  __typename?: "Article";
  id?: Maybe<Scalars["ID"]>;
  headline?: Maybe<Scalars["String"]>;
  tags?: Maybe<Array<Maybe<IGenArticle_Tags>>>;
  body?: Maybe<Array<Maybe<IGenArticle_Body>>>;
  slug?: Maybe<Scalars["String"]>;
  _meta?: Maybe<IGenCaisyDocument_Meta>;
};

export type IGenArticleTagsArgs = {
  locale?: Maybe<Scalars["String"]>;
};

export type IGenArticleBodyArgs = {
  locale?: Maybe<Scalars["String"]>;
};

export type IGenArticle_Tags = IGenArticleTag | IGenCaisy_Field_Document_NotFound;

export type IGenCaisy_Field_Document_NotFound = {
  __typename?: "Caisy_Field_Document_NotFound";
  id?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
};

export type IGenArticle_Body = IGenText | IGenAsset | IGenCaisy_Field_Document_NotFound;

export type IGenCategory_Connection = {
  __typename?: "Category_Connection";
  edges?: Maybe<Array<Maybe<IGenCategory_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type IGenCategory_ConnectionEdge = {
  __typename?: "Category_ConnectionEdge";
  node?: Maybe<IGenCategory>;
  cursor?: Maybe<Scalars["String"]>;
};

export type IGenCategory_Sort = {
  title?: Maybe<Order>;
  slug?: Maybe<Order>;
  items?: Maybe<Order>;
};

export type IGenCategory_Where = {
  title?: Maybe<IGenCaisyField_String_Where>;
  slug?: Maybe<IGenCaisyField_String_Where>;
  OR?: Maybe<Array<Maybe<IGenCategory_Where>>>;
  AND?: Maybe<Array<Maybe<IGenCategory_Where>>>;
};

export type IGenNavigationItem_Connection = {
  __typename?: "NavigationItem_Connection";
  edges?: Maybe<Array<Maybe<IGenNavigationItem_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type IGenNavigationItem_ConnectionEdge = {
  __typename?: "NavigationItem_ConnectionEdge";
  node?: Maybe<IGenNavigationItem>;
  cursor?: Maybe<Scalars["String"]>;
};

export type IGenNavigationItem_Sort = {
  title?: Maybe<Order>;
  slug?: Maybe<Order>;
  description?: Maybe<Order>;
  items?: Maybe<Order>;
};

export type IGenNavigationItem_Where = {
  title?: Maybe<IGenCaisyField_String_Where>;
  slug?: Maybe<IGenCaisyField_String_Where>;
  description?: Maybe<IGenCaisyField_String_Where>;
  OR?: Maybe<Array<Maybe<IGenNavigationItem_Where>>>;
  AND?: Maybe<Array<Maybe<IGenNavigationItem_Where>>>;
};

export type IGenArticle_Connection = {
  __typename?: "Article_Connection";
  edges?: Maybe<Array<Maybe<IGenArticle_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type IGenArticle_ConnectionEdge = {
  __typename?: "Article_ConnectionEdge";
  node?: Maybe<IGenArticle>;
  cursor?: Maybe<Scalars["String"]>;
};

export type IGenArticle_Sort = {
  headline?: Maybe<Order>;
  tags?: Maybe<Order>;
  body?: Maybe<Order>;
  slug?: Maybe<Order>;
};

export type IGenArticle_Where = {
  headline?: Maybe<IGenCaisyField_String_Where>;
  slug?: Maybe<IGenCaisyField_String_Where>;
  OR?: Maybe<Array<Maybe<IGenArticle_Where>>>;
  AND?: Maybe<Array<Maybe<IGenArticle_Where>>>;
};

export type IGenAsset_Connection = {
  __typename?: "Asset_Connection";
  edges?: Maybe<Array<Maybe<IGenAsset_ConnectionEdge>>>;
  pageInfo?: Maybe<IGenPageInfo>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type IGenAsset_ConnectionEdge = {
  __typename?: "Asset_ConnectionEdge";
  node?: Maybe<IGenAsset>;
  cursor?: Maybe<Scalars["String"]>;
};

export type IGenAsset_Sort = {
  src?: Maybe<Order>;
  title?: Maybe<Order>;
  description?: Maybe<Order>;
  originalName?: Maybe<Order>;
  author?: Maybe<Order>;
  keywords?: Maybe<Order>;
  originType?: Maybe<Order>;
  copyright?: Maybe<Order>;
  dominantColor?: Maybe<Order>;
};

export type IGenAsset_Where = {
  title?: Maybe<IGenCaisyField_String_Where>;
  description?: Maybe<IGenCaisyField_String_Where>;
  originalName?: Maybe<IGenCaisyField_String_Where>;
  author?: Maybe<IGenCaisyField_String_Where>;
  keywords?: Maybe<IGenCaisyField_String_Where>;
  originType?: Maybe<IGenCaisyField_String_Where>;
  copyright?: Maybe<IGenCaisyField_String_Where>;
  dominantColor?: Maybe<IGenCaisyField_String_Where>;
  OR?: Maybe<Array<Maybe<IGenAsset_Where>>>;
  AND?: Maybe<Array<Maybe<IGenAsset_Where>>>;
};

export type IGenCaisy_Document =
  | IGenNavigationItem
  | IGenArticle
  | IGenNavigationTop
  | IGenCategory
  | IGenArticleTag
  | IGenText
  | IGenAsset
  | IGenCaisy_Document_NotFound;

export type IGenCaisy_Document_NotFound = {
  __typename?: "Caisy_Document_NotFound";
  message?: Maybe<Scalars["String"]>;
};

export type IGenMutation = {
  __typename?: "Mutation";
  createArticleTag?: Maybe<IGenArticleTag>;
  updateArticleTag?: Maybe<IGenArticleTag>;
  removeArticleTag?: Maybe<Scalars["Boolean"]>;
  createCategory?: Maybe<IGenCategory>;
  updateCategory?: Maybe<IGenCategory>;
  removeCategory?: Maybe<Scalars["Boolean"]>;
  createAsset?: Maybe<IGenAsset>;
  updateAsset?: Maybe<IGenAsset>;
  removeAsset?: Maybe<Scalars["Boolean"]>;
};

export type IGenMutationCreateArticleTagArgs = {
  locale?: Maybe<Scalars["String"]>;
  input: IGenArticleTag_CreateInput;
};

export type IGenMutationUpdateArticleTagArgs = {
  id: Scalars["ID"];
  merge?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
  input: IGenArticleTag_UpdateInput;
};

export type IGenMutationRemoveArticleTagArgs = {
  id: Scalars["ID"];
  locale?: Maybe<Scalars["String"]>;
};

export type IGenMutationCreateCategoryArgs = {
  locale?: Maybe<Scalars["String"]>;
  input: IGenCategory_CreateInput;
};

export type IGenMutationUpdateCategoryArgs = {
  id: Scalars["ID"];
  merge?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
  input: IGenCategory_UpdateInput;
};

export type IGenMutationRemoveCategoryArgs = {
  id: Scalars["ID"];
  locale?: Maybe<Scalars["String"]>;
};

export type IGenMutationCreateAssetArgs = {
  locale?: Maybe<Scalars["String"]>;
  input: IGenAsset_CreateInput;
};

export type IGenMutationUpdateAssetArgs = {
  id: Scalars["ID"];
  merge?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
  input: IGenAsset_UpdateInput;
};

export type IGenMutationRemoveAssetArgs = {
  id: Scalars["ID"];
  locale?: Maybe<Scalars["String"]>;
};

export type IGenArticleTag_CreateInput = {
  key?: Maybe<Scalars["String"]>;
};

export type IGenArticleTag_UpdateInput = {
  key?: Maybe<Scalars["String"]>;
};

export type IGenCategory_CreateInput = {
  title?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  items?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type IGenCategory_UpdateInput = {
  title?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  items?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type IGenAsset_CreateInput = {
  src?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  originalName?: Maybe<Scalars["String"]>;
  author?: Maybe<Scalars["String"]>;
  keywords?: Maybe<Scalars["String"]>;
  originType?: Maybe<Scalars["String"]>;
  copyright?: Maybe<Scalars["String"]>;
  dominantColor?: Maybe<Scalars["String"]>;
};

export type IGenAsset_UpdateInput = {
  src?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  originalName?: Maybe<Scalars["String"]>;
  author?: Maybe<Scalars["String"]>;
  keywords?: Maybe<Scalars["String"]>;
  originType?: Maybe<Scalars["String"]>;
  copyright?: Maybe<Scalars["String"]>;
  dominantColor?: Maybe<Scalars["String"]>;
};
