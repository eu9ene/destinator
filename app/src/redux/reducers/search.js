import {SEARCH_FINISHED, SEARCH_LOAD_SUGGESTIONS_COMPLETED} from "../actionTypes";

const initialState = {
  suggestions: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_FINISHED:
      return {
        ...state,
        suggestions: action.payload.result
      };
    case SEARCH_LOAD_SUGGESTIONS_COMPLETED:
      return {
        ...state,
        suggestions: action.payload.result
      };
    default:
      return state;
  }
}