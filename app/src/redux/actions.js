import {
    PLACE_LOAD_FINISHED,
    PLACE_IS_LOADING,
    SEARCH_FINISHED,
    MYPLACES_ADD,
    MYPLACES_REMOVE,
    MYPLACES_LOAD_FINISHED, SEARCH_LOAD_SUGGESTIONS_COMPLETED, RECS_LOAD_FINISHED, MYPLACES_IDS_LOAD_FINISHED
} from "./actionTypes";
import {PAGE_SIZE} from "./constants";


export function searchCommand(searchQuery, history, skip = 0) {
    return function (dispatch) {
        if (searchQuery === '') {
            return;
        }
        return fetch('http://0.0.0.0:8000/search',
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
        return fetch('http://0.0.0.0:8000/byids',
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
        return fetch('http://0.0.0.0:8000/similar',
            {
                method: "POST",
                body: JSON.stringify({id: id, count: PAGE_SIZE})
            })
            .then(searchResult => searchResult.json())
            .then(searchResult => dispatch(loadRecsDone(searchResult)));
    };
}

export function findNearbyCommand(id) {
    return function (dispatch) {
        return fetch('http://0.0.0.0:8000/nearby',
            {
                method: "POST",
                body: JSON.stringify({id: id, count: PAGE_SIZE})
            })
            .then(searchResult => searchResult.json())
            .then(searchResult => dispatch(loadRecsDone(searchResult)));
    };
}


export function loadRecsDone(result, id) {
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
        return fetch('http://0.0.0.0:8000/myplaces',
            {
                method: "POST",
                body: JSON.stringify({type: type})
            })
            .then(res => res.json())
            .then(res => dispatch({
                type: MYPLACES_LOAD_FINISHED,
                payload: {
                    type: type,
                    result: res
                }
            }));
            // .then(res => dispatch({
            //     type: MYPLACES_IDS_LOAD_FINISHED,
            //     payload: {
            //         type: type,
            //         result: res
            //     }
            // }));
    }
}


export function addPlace(id, type) {
    return function (dispatch) {
        return fetch('http://0.0.0.0:8000/addmyplace',
            {
                method: "POST",
                body: JSON.stringify({id: id, type: type})
            })
            .then(() => dispatch(loadMyPlaces(type)));
    }
}

export function removePlace(id, type) {
    return function (dispatch) {
        return fetch('http://0.0.0.0:8000/removemyplace',
            {
                method: "POST",
                body: JSON.stringify({id: id, type: type})
            })
            .then(() => dispatch(loadMyPlaces(type)));
    }
}