import { useQuery } from "react-query";
import {  gql } from "graphql-request";

import { graphQLClient } from '../config/api'

export function useGetSingleQuiz(id: string) {
  return useQuery(["get-category", id], async () => {
    const { questionnaireFind } = await graphQLClient.request(gql`
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
    `, { id });
    return questionnaireFind;
  });
}


export function useGetQuizMeta(id: string) {
  return useQuery(["get-category-meta", id], async () => {
    const { questionnaireFind } = await graphQLClient.request(gql`
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
    `, { id });
    return questionnaireFind;
  });
}
