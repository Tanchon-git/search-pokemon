import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { cache } from "react";

const GRAPHQL_API_URL = "https://graphql-pokemon2.vercel.app/";

export const initializeApollo = cache(() => {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: GRAPHQL_API_URL,
      fetch,
    }),
    cache: new InMemoryCache(),
  });
});
