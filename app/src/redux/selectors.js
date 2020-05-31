export const getRecs = state => {
    return state.recs.places;
};

export const getSuggestions = state => {
    return state.search.suggestions;
};


export const getHasMore = state => {
    return state.search.hasMore;
};


export const getCurrentPlace = state => {
    return {
        place: state.place.currentPlace,
        id: state.place.id,
        similarPlaces: state.place.similarPlaces
    };
};

export const getMyPlaces = (state) => {
    return {
        places: state.myPlaces.places
    };
};

export const getMyPlacesIds = (state) => {
    return  state.myPlaces.placesIds;

};


export const getMyPlacesOfType = (state, type) => {
    return {
        places: state.myPlaces.places[type]
    };
};


