import { FullscreenReducer } from './FullscreenReducer';
import { NotificationReducer } from './NotificationReducer';
import { combineReducers } from 'redux';
import { publications } from './PublicationsReducer';
import { users } from './UsersReducer';
import { works } from './WorksReducer';

export default combineReducers({
    FullscreenReducer,
    NotificationReducer,
    users,
    works,
    publications
});