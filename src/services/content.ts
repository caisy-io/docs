import { GraphQLClient } from "graphql-request";
import { IGenNavigationTop } from "../constants/gen_types";
import { query_NavigationTop } from "./queries/query_NavigationTop";

export const getContent = async (): Promise<{ NavigationTop: IGenNavigationTop }> => {
  const endpoint = "https://caisy.io/api/v1/e/f7d8ac8f-70c1-4fb5-8beb-3e68533e2392/graphql";
  const client = new GraphQLClient(endpoint);
  // Set a single header
  client.setHeader("x-caisy-token", process.env.NEXT_PUBLIC_CAISY_ORG_TOKEN);

  const [NavigationTopRes] = await Promise.all([client.request(query_NavigationTop)]);

  return {
    ...NavigationTopRes,
  };
};
