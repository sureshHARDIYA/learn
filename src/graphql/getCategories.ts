import { gql } from "@apollo/client";

const GET_CATEGORY = gql`
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
`;


export default GET_CATEGORY