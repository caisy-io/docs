import { useRouter } from "next/router";
import { getContent } from "src/services/content";
import { IGenArticle, IGenCategory, IGenNavigationItem } from "../constants/gen_types";
import { Article } from "../components/article/Article";

const Page = ({ NavigationTop, article, category, navigationItem }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    console.log(` props`, { NavigationTop }, router.query, { article }, { category }, { navigationItem });
  }

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

export {getStaticProps} from "../utils/getStaticProps";

export default Page;
