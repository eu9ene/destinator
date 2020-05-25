import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {reducer} from "./reducers/search";

export default createStore(reducer, applyMiddleware(thunk));