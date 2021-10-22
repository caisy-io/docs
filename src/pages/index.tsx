import { useRouter } from "next/router";
import { getContent } from "../services/content";

const Page = () => {
  const router = useRouter();
  console.log(router);

  return <div>Page</div>;
};

export async function getStaticProps() {
  return {
    props: {
      ...(await getContent()),
    },
  };
}

export default Page;
