import {
    PLACE_LOAD_FINISHED,
    PLACE_IS_LOADING,
    SEARCH_FINISHED,
    MYPLACES_ADD,
    MYPLACES_REMOVE,
    MYPLACES_LOAD_FINISHED,
    SEARCH_LOAD_SUGGESTIONS_COMPLETED,
    RECS_LOAD_FINISHED,
    MYPLACES_IDS_LOAD_FINISHED,
    SIMILAR_LOAD_FINISHED
} from "./actionTypes";
import {MyPlaceType, PAGE_SIZE} from "./constants";


export function searchCommand(searchQuery, history, skip = 0) {
    return function (dispatch) {
        if (searchQuery === '') {
            return;
        }
        return fetch('http://0.0.0.0:8000/search/byname',
            {
                method: "POST",
                body: JSON.stringify({query: searchQuery, count: PAGE_SIZE, skip: skip})
            })
            .then(searchResult => searchResult.json())
            .then(searchResult => dispatch(searchSuggestionsLoaded(searchResult)));
        // .then(history.push('/'));
    };
}


export function searchDone(result) {
    return {
        type: SEARCH_FINISHED,
        payload: {
            result: result
        }
    };
}

export function searchSuggestionsLoaded(result) {
    return {
        type: SEARCH_LOAD_SUGGESTIONS_COMPLETED,
        payload: {
            result: result
        }
    };
}

//----------------------

export function loadPlaceCommand(id) {
    return function (dispatch) {
        // dispatch(placeIsLoading());
        return fetch('http://0.0.0.0:8000/search/byids',
            {
                method: "POST",
                body: JSON.stringify({ids: [id]})
            })
            .then(searchResult => searchResult.json())
            .then(searchResult => dispatch(loadPlaceDone(searchResult[0], id)));

    };
}


export function loadPlaceDone(result, id) {
    return {
        type: PLACE_LOAD_FINISHED,
        payload: {
            place: result,
            id: id
        }
    };
}

export function placeIsLoading() {
    return {
        type: PLACE_IS_LOADING
    };
}

//---------------------


export function findSimilarCommand(id) {
    return function (dispatch) {
        return fetch('http://0.0.0.0:8000/recs/similar',
            {
                method: "POST",
                body: JSON.stringify({id: id, count: PAGE_SIZE})
            })
            .then(searchResult => searchResult.json())
            .then(searchResult => dispatch(loadSimilarDone(searchResult)));
    };
}

export function loadSimilarDone(result) {
    return {
        type: SIMILAR_LOAD_FINISHED,
        payload: {
            result: result,
        }
    };
}


export function findNearbyCommand(id) {
    return function (dispatch) {
        return fetch('http://0.0.0.0:8000/recs/nearby',
            {
                method: "POST",
                body: JSON.stringify({id: id, count: PAGE_SIZE})
            })
            .then(searchResult => searchResult.json())
            .then(searchResult => dispatch(loadRecsDone(searchResult)));
    };
}

export function recommendCommand() {
    return function (dispatch) {
        return fetch('http://0.0.0.0:8000/recs/personal',
            {
                method: "POST",
                body: JSON.stringify({count: PAGE_SIZE})
            })
            .then(searchResult => searchResult.json())
            .then(searchResult => dispatch(loadRecsDone(searchResult)));
    };
}


export function loadRecsDone(result) {
    return {
        type: RECS_LOAD_FINISHED,
        payload: {
            result: result,
        }
    };
}


// ------------------


export function loadMyPlaces(type) {
    return function (dispatch) {
        return fetch('http://0.0.0.0:8000/myplaces/places',
            {
                method: "POST",
                body: JSON.stringify({type: type})
            })
            .then(res => res.json())
            .then(res => {
                dispatch(myPlacesLoaded(res, type));
                return res;
            })
            .then(res => dispatch(myPlacesIdsLoaded(res != null ? res.map(p => p.id) : null, type)));
    }
}


export function loadMyPlacesIdsAll() {
    return function (dispatch) {
        return Promise.all([
            dispatch(loadMyPlacesIds(MyPlaceType.Been)),
            dispatch(loadMyPlacesIds(MyPlaceType.Loved)),
            dispatch(loadMyPlacesIds(MyPlaceType.BucketList))
        ]);
    }
}

export function loadMyPlacesIds(type) {
    return function (dispatch) {
        return fetch('http://0.0.0.0:8000/myplaces/ids',
            {
                method: "POST",
                body: JSON.stringify({type: type})
            })
            .then(res => res.json())
            .then(res =>
                dispatch(myPlacesIdsLoaded(res, type))
            )

    }
}

function myPlacesIdsLoaded(res, type) {
    return {
        type: MYPLACES_IDS_LOAD_FINISHED,
        payload: {
            type: type,
            result: res
        }
    };
}

function myPlacesLoaded(res, type) {
    return {
        type: MYPLACES_LOAD_FINISHED,
        payload: {
            type: type,
            result: res
        }
    };
}


export function addPlace(id, type) {
    return function (dispatch) {
        return fetch('http://0.0.0.0:8000/myplaces/add',
            {
                method: "POST",
                body: JSON.stringify({id: id, type: type})
            })
            .then(() => dispatch(loadMyPlaces(type)))
            .then(() => dispatch(recommendCommand()));
    }
}

export function removePlace(id, type) {
    return function (dispatch) {
        return fetch('http://0.0.0.0:8000/myplaces/remove',
            {
                method: "POST",
                body: JSON.stringify({id: id, type: type})
            })
            .then(() => dispatch(loadMyPlaces(type)))
            .then(() => dispatch(recommendCommand()));
    }
}