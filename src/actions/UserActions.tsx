import { UsersActions, UsersState } from "../reducers/UsersReducer";

import { API } from "../utils/restUtils";
import { Dispatch } from "redux";
import { IStore } from "../store";
import { IUserLocal } from "../utils/Rest";

export function usersFetchDataSuccess(users: IUserLocal) {
    return {
        type: UsersActions.GET,
        users
    };
}

export function usersSetData(user: IUserLocal) {
    return {
        type: UsersActions.SET,
        user
    };
}

function getUserPhoto(id: number): Promise<any> {
    return fetch(`${API}/photos/${id}`)
        .then(response => response.json())
}

export function usersFetchData(id: number) {
    return (dispatch: Dispatch, stateF: any) => {
        const state = stateF() as IStore;
        let user: IUserLocal = null;
        const usersLocal = state.users as UsersState;
        const userById = usersLocal.users.find(v => v.id === id);
        if (userById) {            
            return dispatch(usersFetchDataSuccess(userById.user));
        }

        fetch(`${API}/users/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((userFetch: IUserLocal) => {
                user = userFetch;
                return getUserPhoto(user.id).then((img) => {
                    user.photo = img;
                }).then(() => {
                    return dispatch(usersFetchDataSuccess(user));
                });

            })
    };
}

export function setUser(user: IUserLocal) {
    return (dispatch: Dispatch) => {
        return dispatch(usersSetData(user));
    };
}