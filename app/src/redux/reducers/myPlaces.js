import {MYPLACES_LOAD_FINISHED} from "../actionTypes";
import {MyPlaceType} from "../constants"

const initialState = {
    places: {
        [MyPlaceType.Been]: null,
        [MyPlaceType.Loved]: null,
        [MyPlaceType.BucketList]: null
    },
    placesIds: {
        [MyPlaceType.Been]: new Set(),
        [MyPlaceType.Loved]: new Set(),
        [MyPlaceType.BucketList]: new Set()
    }
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case MYPLACES_LOAD_FINISHED:
            const newPlaces = state.places;
            const newPlacesIds = state.placesIds;
            if (action.payload.result != null) {
                newPlacesIds[action.payload.type] = new Set(action.payload.result.map(p => p.id));
                newPlaces[action.payload.type] = action.payload.result;
            } else {
                newPlaces[action.payload.type] = [];
                newPlacesIds[action.payload.type] = new Set();
            }

            return {
                ...state,
                places: newPlaces,
                placesIds: newPlacesIds
            };

        // case MYPLACES_IDS_LOAD_FINISHED:
        //     const newPlacesIds = state.placesIds;
        //     if (action.payload.result != null)
        //         newPlacesIds[action.payload.place_type] = new Set(action.payload.result.map(p => p.id));
        //     else
        //         newPlacesIds[action.payload.place_type] = new Set();
        //     return {
        //         ...state,
        //         placesIds: newPlacesIds
        //     };
        // // case MYPLACES_ADD:
        //     if (newPlaces[action.payload.place_type] == null)
        //         newPlaces[action.payload.place_type] = new Set();
        //     newPlaces[action.payload.place_type].add(action.payload.id);
        //     return {
        //         ...state,
        //         places: newPlaces
        //     };
        // case MYPLACES_REMOVE:
        //     if (newPlaces[action.payload.place_type] != null)
        //         newPlaces[action.payload.place_type].delete(action.payload.id);
        //     return {
        //         ...state,
        //         places: newPlaces
        //     };


        default:
            return state;
    }
}