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
        id: state.place.id
    };
};


export const getMyPlaces = (state, type) => {
    return {
        places: state.myPlaces.places[type]
    };
};


