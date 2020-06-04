import {PLACE_LOAD_FINISHED, SIMILAR_LOAD_FINISHED} from "../actionTypes";

const initialState = {
    currentPlace: null,
    id: 0,
    similarPlaces: null,
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PLACE_LOAD_FINISHED:
            return {
                ...state,
                currentPlace: action.payload.place,
                id: action.payload.id
            };
        case SIMILAR_LOAD_FINISHED:
            return {
                ...state,
                similarPlaces: action.payload.result
            };

        default:
            return state;
    }
}