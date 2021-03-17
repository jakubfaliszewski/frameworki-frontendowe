import { IUser } from '../utils/Rest';
import { Moment } from 'moment';
import { newMomentDate } from './../utils/dateUtils';
import { v4 as uuid } from "uuid";

export interface NotificationState {
    notifications: Notification[]
}

interface Notification {
    user: IUser,
    title: string,
    id?: string,
    time?: Moment
}

const initialState: NotificationState = {
    notifications: []
}

interface NotificationId  {
    notificationId: string
}

export enum NotificationActions {
    'ADD' = 'ADD_NOTIFICATION',
    'REMOVE' = 'REMOVE_NOTIFICATION'
}

export type NotificationAction = { type: NotificationActions, payload: NotificationState | NotificationId };

export const NotificationReducer = (state: NotificationState = initialState, action: NotificationAction) => {
    switch (action.type) {
        case NotificationActions.ADD: {
            (action.payload as unknown as Notification).id = uuid();
            (action.payload as unknown as Notification).time = newMomentDate(new Date());
            return { ...state, notifications: [...state.notifications, action.payload] }
        }
        case NotificationActions.REMOVE: {
            const id = (action.payload as NotificationId).notificationId;
            const newNotifications = [...state.notifications].filter((v) => v.id !== id);            
            return { notifications: newNotifications};
        }
        default:
            return state;
    }
}