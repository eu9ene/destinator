import {RECS_LOAD_FINISHED} from "../actionTypes";
import {PAGE_SIZE} from "../constants";

const initialState = {
  places: [],
  geoFilter: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RECS_LOAD_FINISHED:
      return {
        ...state,
        places: action.payload.result,
        hasMore: action.payload.result.length < PAGE_SIZE
      };
    default:
      return state;
  }
}