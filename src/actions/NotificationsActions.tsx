import { INotification, NotificationActions } from "../reducers/NotificationReducer";

import { Dispatch } from "redux";

export function notificationAddAction(notification: INotification) {
    return {
        type: NotificationActions.ADD,
        notification
    };
}

export function notificationRmAction(id: string) {
    return {
        type: NotificationActions.REMOVE,
        id
    };
}


export function addNotification(notif: INotification) {
    return (dispatch: Dispatch) => {
        return dispatch(notificationAddAction(notif));
    };
}

export function removeNotification(id: string) {
    return (dispatch: Dispatch) => {
        return dispatch(notificationRmAction(id));
    };
}