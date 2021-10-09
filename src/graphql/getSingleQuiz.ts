import { gql } from "@apollo/client";

const GET_SINGLE_QUESTIONNAIRE = gql`
  query QUESTIONNAIRE_FIND($id: String!) {
    questionnaireFind(id: $id) {
      id
      name
      description
      status
      level
      category {
        name
        id
      }
      questions {
        id
        title
        explainAnswer
        questionType
        answers {
          id
          title
          score
          isCorrect
          answerType
        }
      }
      createdBy {
        id
        email
        firstName
      }
      createdAt
      updatedAt
    }
  }
`;

export default GET_SINGLE_QUESTIONNAIRE;
