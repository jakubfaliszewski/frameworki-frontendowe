import { IUser } from '../utils/Rest';
import { Moment } from 'moment';
import { newMomentDate } from './../utils/dateUtils';
import { v4 as uuid } from "uuid";

export interface NotificationState {
    notifications: INotification[]
}

export interface INotification {
    user?: IUser,
    title: string,
    id?: string,
    time?: Moment
}

const initialState: NotificationState = {
    notifications: []
}

interface NotificationId  {
    id: string
}

export enum NotificationActions {
    'ADD' = 'ADD_NOTIFICATION',
    'REMOVE' = 'REMOVE_NOTIFICATION'
}

export type NotificationAction = { type: NotificationActions, notification: INotification | NotificationId };

export const NotificationReducer = (state: NotificationState = initialState, action: NotificationAction) => {
    switch (action.type) {
        case NotificationActions.ADD: {
            (action.notification as unknown as INotification).id = uuid();
            (action.notification as unknown as INotification).time = newMomentDate(new Date());
            return { ...state, notifications: [...state.notifications, action.notification] }
        }
        case NotificationActions.REMOVE: {
            const id = (action as unknown as NotificationId).id;
            const newNotifications = [...state.notifications].filter((v) => v.id !== id);            
            return { notifications: newNotifications};
        }
        default:
            return state;
    }
}