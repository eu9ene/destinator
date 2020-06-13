import {PLACE_LOAD_FINISHED} from "../actionTypes";

const initialState = {
    currentPlace: null
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PLACE_LOAD_FINISHED:
            return {
                ...state,
                currentPlace: action.payload.place
            };

        default:
            return state;
    }
}