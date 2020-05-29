export const getAttractions = state => {
    return state.search.attractions;
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



