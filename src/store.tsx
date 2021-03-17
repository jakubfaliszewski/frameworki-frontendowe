import { NotificationReducer, NotificationState } from './reducers/NotificationReducer';
import { combineReducers, createStore } from 'redux';

export interface IStore {
    NotificationReducer: NotificationState
}

export const store = createStore(combineReducers({
    NotificationReducer
}))
