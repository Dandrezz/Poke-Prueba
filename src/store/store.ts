import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import { rootReducer } from '../reducers/rootReducer';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = (typeof window !== 'undefined' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);