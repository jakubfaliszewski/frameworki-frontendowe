import { IUser } from '../utils/Rest';
import { Moment } from 'moment';
import { newMomentDate } from './../utils/dateUtils';

export interface NotificationState {
    notifications: Notification[]
}

interface Notification {
    user: IUser,
    title: string,
    time?: Moment
}

const initialState: NotificationState = {
    notifications: []
}

export enum NotificationActions {
    'ADD' = 'ADD_NOTIFICATION'
}

export type NotificationAction = { type: NotificationActions.ADD, payload: NotificationState };

export const NotificationReducer = (state: NotificationState = initialState, action: NotificationAction) => {
    switch (action.type) {
        case NotificationActions.ADD: {
            (action.payload as any).time = newMomentDate(new Date());
            if (true) {
                return { ...state, notifications: [...state.notifications, action.payload] }
            } else return state;
        }
        default:
            return state;
    }
}