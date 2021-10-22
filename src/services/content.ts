import { GraphQLClient } from "graphql-request";
import { IGenNavigationTop } from "../constants/gen_types";
import { query_NavigationTop } from "./queries/query_NavigationTop";

export const getContent = async (): Promise<{ NavigationTop: IGenNavigationTop }> => {
  const endpoint = `https://caisy.io/api/v1/e/${process.env.CAISY_ORGANIZATION_ID}/graphql`;
  const client = new GraphQLClient(endpoint);
  // Set a single header
  client.setHeader("x-caisy-apikey", process.env.CAISY_API_KEY);

  const [NavigationTopRes] = await Promise.all([client.request(query_NavigationTop)]);

  return {
    ...NavigationTopRes,
  };
};
