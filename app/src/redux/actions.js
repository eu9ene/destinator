import {SEARCH_FINISHED} from "./actionTypes";


export function searchCommand(searchQuery) {
  return function(dispatch) {
        return fetch('http://0.0.0.0:8000/search',
             {
                method: "POST",
                body: JSON.stringify({query: searchQuery})
            })
      .then(searchResult => searchResult.json())
      .then(searchResult => dispatch(searchDone(searchResult)));
  };
}

export function findSimilarCommand(id) {
  return function(dispatch) {
        return fetch('http://0.0.0.0:8000/similar',
             {
                method: "POST",
                body: JSON.stringify({id: id})
            })
      .then(searchResult => searchResult.json())
      .then(searchResult => dispatch(searchDone(searchResult)));
  };
}

export function findNearbyCommand(id) {
  return function(dispatch) {
        return fetch('http://0.0.0.0:8000/nearby',
             {
                method: "POST",
                body: JSON.stringify({id: id})
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