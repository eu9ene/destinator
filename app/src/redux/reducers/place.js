import {LOAD_PLACE_FINISHED, PLACE_IS_LOADING} from "../actionTypes";

const initialState = {
    currentPlace: null,
    id: 0
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        // case PLACE_IS_LOADING:
        //     return {
        //         ...state,
        //         currentPlace: null
        //     };
         case LOAD_PLACE_FINISHED:
            return {
                ...state,
                currentPlace: action.payload.place,
                id: action.payload.id
            };

        default:
            return state;
    }
}