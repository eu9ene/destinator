export const getPlaces = state => {
    return {
        places: state.recs.places,
        hasMore: state.recs.hasMore
    };
};

export const getSuggestions = state => {
    return state.search.suggestions;
};



export const getCurrentPlace = state => {
    return {
        place: state.place.currentPlace
    };
};



export const getMyPlacesIds = (state) => {
    return  state.myPlaces.placesIds;

};

export const getGoogleKey = (state) => {
    return  state.secrets.googleKey;

};


export const getMyPlacesOfType = (state, type) => {
    return {
        places: state.myPlaces.places[type]
    };
};


