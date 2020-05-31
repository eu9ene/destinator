import {MYPLACES_LOAD_FINISHED, MYPLACES_ADD, MYPLACES_REMOVE} from "../actionTypes";
import {MyPlaceType} from "../constants"

const initialState = {
    places: {
        [MyPlaceType.Been]: null,
        [MyPlaceType.Loved]: null,
        [MyPlaceType.BucketList]: null
    }
};


export default function reducer(state = initialState, action) {
    const newPlaces = state.places;
    switch (action.type) {
        case MYPLACES_LOAD_FINISHED:
            if (action.payload.result != null)
                newPlaces[action.payload.type] = new Set(action.payload.result)
            else
                newPlaces[action.payload.type] = new Set();
            return {
                ...state,
                places: newPlaces
            };
        // case MYPLACES_ADD:
        //     if (newPlaces[action.payload.type] == null)
        //         newPlaces[action.payload.type] = new Set();
        //     newPlaces[action.payload.type].add(action.payload.id);
        //     return {
        //         ...state,
        //         places: newPlaces
        //     };
        // case MYPLACES_REMOVE:
        //     if (newPlaces[action.payload.type] != null)
        //         newPlaces[action.payload.type].delete(action.payload.id);
        //     return {
        //         ...state,
        //         places: newPlaces
        //     };


        default:
            return state;
    }
}