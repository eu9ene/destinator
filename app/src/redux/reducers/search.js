import {LOAD_PLACE_FINISHED, SEARCH_FINISHED} from "../actionTypes";
import {pageSize} from "../constants";

const initialState = {
  suggestions: [],
  attractions: [],
  hasMore: false,
  currentPlace: null
};



export function reducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_FINISHED:
      return {
        ...state,
        attractions: action.payload.result,
        hasMore: action.payload.result.length < pageSize
      };
      case LOAD_PLACE_FINISHED:
      return {
        ...state,
        currentPlace: action.payload.result
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