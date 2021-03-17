import { FullscreenReducer, FullscreenState } from './reducers/FullscreenReducer';
import { NotificationReducer, NotificationState } from './reducers/NotificationReducer';
import { combineReducers, createStore } from 'redux';

export interface IStore {
    NotificationReducer: NotificationState
    FullscreenReducer: FullscreenState
}

export const store = createStore(combineReducers({
    NotificationReducer,
    FullscreenReducer
}))
