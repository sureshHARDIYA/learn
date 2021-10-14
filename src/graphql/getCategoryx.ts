import { useQuery } from "react-query";
import {  gql } from "graphql-request";

import { graphQLClient } from '../config/api'

export function useGetCategory(id: string) {
  return useQuery(["get-category", id], async () => {
    const { categoryFind } = await graphQLClient.request(gql`
    query CATEGORY_FIND($id: String!) {
      categoryFind(id: $id) {
        id
        name
        description
        questionnaires {
          id
          name
          description
          views
        }
        createdAt
        updatedAt
      }
    }
    `, { id });
    return categoryFind;
  });
}
