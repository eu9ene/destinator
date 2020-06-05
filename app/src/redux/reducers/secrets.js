import {SECRETS_LOAD_FINISHED} from "../actionTypes";


const initialState = {
  googleKey: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SECRETS_LOAD_FINISHED:
      return {
        ...state,
        googleKey: action.payload.googleKey
      };
    default:
      return state;
  }
}