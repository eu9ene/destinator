import { SEARCH_FINISHED } from "../actionTypes";

const initialState = {
  suggestions: [],
  attractions: []
};



export function reducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_FINISHED:
      return {
        ...state,
        attractions: action.payload.result
      };
    case "loadSuggestionsComplete":
      return {
        ...state,
        suggestions: action.payload.result
      };
    default:
      return state;
  }
}