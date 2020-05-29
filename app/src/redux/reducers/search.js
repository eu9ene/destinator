import {SEARCH_FINISHED} from "../actionTypes";
import {pageSize} from "../constants";

const initialState = {
  suggestions: [],
  attractions: [],
  hasMore: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_FINISHED:
      return {
        ...state,
        attractions: action.payload.result,
        hasMore: action.payload.result.length < pageSize
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