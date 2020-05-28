import {LOAD_PLACE_FINISHED, SEARCH_FINISHED} from "./actionTypes";
import {pageSize} from "./constants";


export function searchCommand(searchQuery, history, skip = 0) {
    return function (dispatch) {
        if (searchQuery === '') {
            return;
        }
        return fetch('http://0.0.0.0:8000/search',
            {
                method: "POST",
                body: JSON.stringify({query: searchQuery, count: pageSize, skip: skip})
            })
            .then(searchResult => searchResult.json())
            .then(searchResult => dispatch(searchDone(searchResult)))
            .then(history.push('/'));
    };
}

export function loadPlaceCommand(id) {
    return function (dispatch) {
        return fetch('http://0.0.0.0:8000/byid',
            {
                method: "POST",
                body: JSON.stringify({id: id})
            })
            .then(searchResult => searchResult.json())
            .then(searchResult => dispatch(loadPlaceDone(searchResult)));

    };
}

export function findSimilarCommand(id, history) {
    return function (dispatch) {
        return fetch('http://0.0.0.0:8000/similar',
            {
                method: "POST",
                body: JSON.stringify({id: id, count: pageSize})
            })
            .then(searchResult => searchResult.json())
            .then(searchResult => dispatch(searchDone(searchResult)))
            .then(history.push(`/place/${id}`));
    };
}

export function findNearbyCommand(id) {
    return function (dispatch) {
        return fetch('http://0.0.0.0:8000/nearby',
            {
                method: "POST",
                body: JSON.stringify({id: id, count: pageSize})
            })
            .then(searchResult => searchResult.json())
            .then(searchResult => dispatch(searchDone(searchResult)));
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

export function loadPlaceDone(result) {
    return {
        type: LOAD_PLACE_FINISHED,
        payload: {
            result: result
        }
    };
}