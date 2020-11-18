import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import { userReducer } from './user/reducer';

const rootReducer = combineReducers({
    user: userReducer,
})

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)