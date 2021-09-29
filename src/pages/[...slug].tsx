import { useRouter } from "next/router";
import { getContent } from "src/services/content";
import { IGenArticle, IGenCategory, IGenNavigationItem } from "../constants/gen_types";
import { Article } from "../components/article/Article";

const Page = ({ NavigationTop, article, category, navigationItem }) => {
  const router = useRouter();
  console.log(` props`, { NavigationTop }, router.query, { article }, { category }, { navigationItem });

  return <Article article={article} />;
};

export async function getStaticPaths() {
  const { NavigationTop } = await getContent();

  const paths = (
    NavigationTop?.items.map((navItem: IGenNavigationItem) => {
      return (
        navItem?.items.map((category: IGenCategory) => {
          return (
            category.items?.map((article: IGenArticle) => {
              return `/${navItem.slug}/${category.slug}/${article.slug}`;
            }) ?? null
          );
        }) ?? null
      );
    }) ?? []
  )
    .flat()
    .flat()
    .filter((e) => e !== null);

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  console.log(` params`, params);
  const content = await getContent();
  return {
    props: {
      ...content,
      navigationItem:
        (content?.NavigationTop?.items.find(
          (navigationItem: IGenNavigationItem) => navigationItem.slug === params?.slug?.[0],
        ) as IGenNavigationItem) ?? null,
      category:
        ((
          content?.NavigationTop?.items.find(
            (navItem: IGenNavigationItem) => navItem.slug === params?.slug?.[0],
          ) as IGenNavigationItem
        )?.items.find((category: IGenCategory) => category.slug === params?.slug?.[1]) as IGenCategory) ?? null,
      article:
        ((
          (
            content?.NavigationTop?.items.find(
              (navItem: IGenNavigationItem) => navItem.slug === params?.slug?.[0],
            ) as IGenNavigationItem
          )?.items.find((category: IGenCategory) => category.slug === params?.slug?.[1]) as IGenCategory
        )?.items.find((article: IGenArticle) => article.slug === params?.slug?.[2]) as IGenArticle) ?? null,
    },
  };
}

export default Page;
