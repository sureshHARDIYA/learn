import { gql } from "@apollo/client";

const GET_SINGLE_CATEGORY = gql`
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
`;

export default GET_SINGLE_CATEGORY
