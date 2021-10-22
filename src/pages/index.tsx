import { useRouter } from "next/router";
import { Article } from "../components/article/Article";

const Page = ({ NavigationTop, article, category, navigationItem }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    console.log(` props`, { NavigationTop }, router.query, { article }, { category }, { navigationItem });
  }

  return <Article article={article} />;
};


export {getStaticProps} from "../utils/getStaticProps";


export default Page;
