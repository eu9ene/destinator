import { combineReducers } from "redux";
import place from "./place";
import search from "./search";
import { connectRouter } from 'connected-react-router'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  search: search,
  place: place
});

export default createRootReducer;



