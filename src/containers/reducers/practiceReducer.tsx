export const practiceReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ANSWER_SELECTED_SINGLE":
      return {
        ...state,
        answersSelected: state.answersSelected.clear().add(action.payload),
        checkAnswerButtonDisabled: false,
      };

    case "ANSWER_SELECTED_MULTIPLE":
      return {
        ...state,
        answersSelected: state.answersSelected.add(action.payload),
        checkAnswerButtonDisabled: false,
      };

    case "GOTO_NEXT_QUESTION":
      return {
        ...state,
        answersSelected: state.answersSelected.clear(),
        checkAnswerButtonDisabled: true,
      };

    case "CHECK_ANSWER_CLICKED":
      /** Store in localstorage and make sure it is answered... */
      return {
        ...state,
        checkAnswerButtonDisabled: true,
        isAnwerSubmitted: true,
        showAnswer: true,
      };
  }
};
