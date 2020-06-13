import {
    PLACE_LOAD_FINISHED,
    SEARCH_LOAD_SUGGESTIONS_COMPLETED,
    RECS_LOAD_FINISHED,
    MYPLACES_IDS_LOAD_FINISHED,
    SECRETS_LOAD_FINISHED, RECS_LOAD_MORE_FINISHED
} from "./actionTypes";
import {MyPlaceType, PAGE_SIZE} from "./constants";


export function searchCommand(searchQuery, skip = 0) {
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
        dispatch(loadPlaceDone(null));
        return fetch('http://0.0.0.0:8000/search/byids',
            {
                method: "POST",
                body: JSON.stringify({ids: [id]})
            })
            .then(searchResult => searchResult.json())
            .then(searchResult => dispatch(loadPlaceDone(searchResult[0])));

    };
}


export function loadPlaceDone(result, id) {
    return {
        type: PLACE_LOAD_FINISHED,
        payload: {
            place: result
        }
    };
}


//---------------------


function fetchSimilar(id, geoBounds, skip) {
    return fetch('http://0.0.0.0:8000/recs/similar',
        {
            method: "POST",
            body: JSON.stringify({id: id, count: PAGE_SIZE, geoBounds: geoBounds, skip: skip})
        })
        .then(searchResult => searchResult.json());
}


function fetchRecommendations(skip, geoBounds) {
    return fetch('http://0.0.0.0:8000/recs/personal',
        {
            method: "POST",
            body: JSON.stringify({
                count: PAGE_SIZE,
                skip: skip,
                geoBounds: geoBounds
            })
        })
        .then(searchResult => searchResult.json());
}

function fetchTop(skip, geoBounds) {
    return fetch('http://0.0.0.0:8000/recs/top',
        {
            method: "POST",
            body: JSON.stringify({
                count: PAGE_SIZE,
                skip: skip,
                geoBounds: geoBounds
            })
        })
        .then(searchResult => searchResult.json());
}

export function findSimilarCommand(id, geoBounds = null) {
    return function (dispatch) {
        dispatch(loadRecsDone(null));
        return fetchSimilar(id, geoBounds)
            .then(searchResult => dispatch(loadRecsDone(searchResult)));
    };
}

export function findMoreSimilarCommand(id, skip, geoBounds = null) {
    return function (dispatch) {
        return fetchSimilar(id, geoBounds, skip)
            .then(searchResult => dispatch(loadMoreRecsDone(searchResult)));
    };
}


export function topCommand(geoBounds = null) {
    return function (dispatch) {
        dispatch(loadRecsDone(null));
        return fetchTop(0, geoBounds)
            .then(searchResult => dispatch(loadRecsDone(searchResult)));
    };
}

export function topMoreCommand(skip, geoBounds = null) {
    return function (dispatch) {
        return fetchTop(skip, geoBounds)
            .then(searchResult => dispatch(loadRecsDone(searchResult)));
    };
}

export function recommendCommand(geoBounds = null) {
    return function (dispatch) {
        dispatch(loadRecsDone(null));
        return fetchRecommendations(0, geoBounds)
            .then(searchResult => dispatch(loadRecsDone(searchResult)));
    };
}


export function recommendMoreCommand(skip, geoBounds = null) {
    return function (dispatch) {
        return fetchRecommendations(skip, geoBounds)
            .then(searchResult => dispatch(loadMoreRecsDone(searchResult)));
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


export function loadMoreRecsDone(result) {
    return {
        type: RECS_LOAD_MORE_FINISHED,
        payload: {
            result: result,
        }
    };
}

// ------------------


export function loadMyPlaces(type) {
    return function (dispatch) {
        dispatch(loadRecsDone(null));
        return fetch('http://0.0.0.0:8000/myplaces/places',
            {
                method: "POST",
                body: JSON.stringify({type: type})
            })
            .then(res => res.json())
            .then(res => {
                dispatch(loadRecsDone(res));
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


export function addPlace(id, type) {
    return function (dispatch) {
        return fetch('http://0.0.0.0:8000/myplaces/add',
            {
                method: "POST",
                body: JSON.stringify({id: id, type: type})
            })
            .then(() => dispatch(loadMyPlaces(type)));
            // .then(() => dispatch(recommendCommand()));
    }
}

export function removePlace(id, type) {
    return function (dispatch) {
        return fetch('http://0.0.0.0:8000/myplaces/remove',
            {
                method: "POST",
                body: JSON.stringify({id: id, type: type})
            })
            .then(() => dispatch(loadMyPlaces(type)));
            // .then(() => dispatch(recommendCommand()));
    }
}


export function loadSecretsCommand() {
    return function (dispatch) {
        return fetch('http://0.0.0.0:8000/secrets/load',
            {
                method: "POST"
            })
            .then(res => res.json())
            .then(res => dispatch({type: SECRETS_LOAD_FINISHED, payload: {googleKey: res}}));
    };
}