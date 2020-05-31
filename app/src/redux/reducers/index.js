import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import place from "./place";
import search from "./search";
import recs from "./recs";
import myPlaces from "./myPlaces";

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  search: search,
  place: place,
  recs: recs,
  myPlaces: myPlaces
});

export default createRootReducer;



