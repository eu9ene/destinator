import {RECS_LOAD_FINISHED, RECS_LOAD_MORE_FINISHED} from "../actionTypes";
import {PAGE_SIZE} from "../constants";

const initialState = {
  places: null,
  hasMore: true
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RECS_LOAD_FINISHED:
      return {
        ...state,
        places: action.payload.result,
        hasMore: action.payload.result != null && action.payload.result.length === PAGE_SIZE
      };
    case RECS_LOAD_MORE_FINISHED:
      return {
        ...state,
        places: state.places ? state.places.concat(action.payload.result) : action.payload.result,
        hasMore: action.payload.result.length === PAGE_SIZE
      };

    default:
      return state;
  }
}