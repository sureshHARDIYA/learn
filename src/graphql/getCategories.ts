import { useQuery } from "react-query";
import {  gql } from "graphql-request";

import { graphQLClient } from '../config/api'

export function useGetCategories() {
  return useQuery("get-categories", async () => {
    const { categoryList } = await graphQLClient.request(gql`
    query CATEGORY_LIST(
      $filter: CategoryFilterInput
      $orderBy: CategoryOrderByEnum
      $limit: Int
      $offset: Int
    ) {
      categoryList(
        filter: $filter
        orderBy: $orderBy
        limit: $limit
        offset: $offset
      ) {
        count
        rows {
          id
          name
          description
          featuredImage {
            publicUrl
          }
          updatedAt
          createdAt
        }
      }
    }
    `);
    return categoryList;
  });
}
