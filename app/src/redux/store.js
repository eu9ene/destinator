import {applyMiddleware, createStore, compose} from "redux";
import thunk from "redux-thunk";
import createRootReducer from "./reducers";
import {routerMiddleware} from 'connected-react-router'
import {createBrowserHistory} from "history";

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
    const store = createStore(
        createRootReducer(history), // root reducer with router state
        preloadedState,
        compose(
            applyMiddleware(
                routerMiddleware(history), // for dispatching history actions
                thunk
            ),
        ),
    );

    return store
}
