import {MYPLACES_IDS_LOAD_FINISHED, MYPLACES_LOAD_FINISHED} from "../actionTypes";
import {MyPlaceType} from "../constants"

const initialState = {
    placesIds: {
        [MyPlaceType.Been]: new Set(),
        [MyPlaceType.Loved]: new Set(),
        [MyPlaceType.BucketList]: new Set()
    }
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case MYPLACES_IDS_LOAD_FINISHED:
            const newPlacesIds = state.placesIds;
            if (action.payload.result != null) {
                newPlacesIds[action.payload.type] = new Set(action.payload.result);
            } else {
                newPlacesIds[action.payload.type] = new Set();
            }

            return {
                ...state,
                placesIds: newPlacesIds
            };

        default:
            return state;
    }
}