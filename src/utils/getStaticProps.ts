import { IGenNavigationItem, IGenCategory, IGenArticle } from "../constants/gen_types";
import { getContent } from "../services/content";

export const getStaticProps = async ({ params }) => {
    const content = await getContent();

  const navigationItem =
    (content?.NavigationTop?.items.find(
      (navigationItem: IGenNavigationItem) => navigationItem.slug === params?.slug?.[0],
    ) as IGenNavigationItem) ||
    (content?.NavigationTop?.items?.[0] as IGenNavigationItem) ||
    null;

  const category =
    (navigationItem?.items?.find((category: IGenCategory) => category.slug === params?.slug?.[1]) as IGenCategory) ||
    (navigationItem.items?.[0] as IGenCategory) ||
    null;

  const article =
    (category?.items.find((article: IGenArticle) => article.slug === params?.slug?.[2]) as IGenArticle) ||
    (category.items?.[0] as IGenArticle) ||
    null;

  return {
    revalidate: 3,
    props: {
      ...content,
      navigationItem,
      category,
      article,
    },
  };
}