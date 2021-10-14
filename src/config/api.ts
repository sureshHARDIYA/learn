import { GraphQLClient } from "graphql-request";

export const ROOT_API = "https://techquiz-production.herokuapp.com/api"


export const graphQLClient = new GraphQLClient(ROOT_API);