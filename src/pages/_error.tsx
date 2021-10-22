import { getContent } from "../services/content";

const Page = (props) => {
  console.error(`Error Page props `, props);
  return <div>Error</div>;
};

export {getStaticProps} from "../utils/getStaticProps";


export default Page;
