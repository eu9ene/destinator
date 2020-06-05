import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import place from "./place";
import search from "./search";
import recs from "./recs";
import myPlaces from "./myPlaces";
import secrets from "./secrets";

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  search: search,
  place: place,
  recs: recs,
  myPlaces: myPlaces,
  secrets: secrets
});

export default createRootReducer;



