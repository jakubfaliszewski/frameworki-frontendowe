import { NotificationReducer } from './reducers/NotificationReducer';
import { createStore } from 'redux';

const createStoreThatDoesNotBreakTheWholeAppBecauseFU = createStore as any;

export const store = createStoreThatDoesNotBreakTheWholeAppBecauseFU(NotificationReducer);