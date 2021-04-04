import { applyMiddleware, createStore } from 'redux';

import { FullscreenState } from './reducers/FullscreenReducer';
import { NotificationState } from './reducers/NotificationReducer';
import { PublicationsState } from './reducers/PublicationsReducer';
import { UsersState } from './reducers/UsersReducer';
import { WorksState } from './reducers/WorksReducer';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

export interface IStore {
    NotificationReducer: NotificationState
    FullscreenReducer: FullscreenState,
    fetchData: Function,
    works: WorksState,
    users: UsersState,
    publications: PublicationsState,
}

export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    );
}