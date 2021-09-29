import { getContent } from "../services/content";

const Page = (props) => {
  console.error(`Error Page props `, props);
  return <div>Error</div>;
};

export async function getStaticProps() {
  return {
    props: {
      ...(await getContent()),
    },
  };
}

export default Page;
