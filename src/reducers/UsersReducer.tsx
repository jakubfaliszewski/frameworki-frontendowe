import { AnyAction } from "redux";
import { IUserLocal } from "../utils/Rest";

export interface UsersState {
    users: {
        id: number,
        user: IUserLocal
    }[]
};

export enum UsersActions {
    'SET' = 'SET_USER',
    'GET' = 'GET_USER',
}

export function users(state: UsersState = { users: [] }, action: AnyAction) {
    switch (action.type) {
        case UsersActions.SET: {
            let find = state.users.find(v => v.id === action.user.id);
            if (find?.user) {
                find.user = action.user;
            }

            return { ...state, users: [...state.users] }
        }
        case UsersActions.GET: {
            let find = state.users.find(v => v?.id === action.users.id);
            if(!find) {
                return { ...state, users: [...state.users, {
                    id: action.users.id,
                    user: action.users
                }] };
            }

            return state;
        }
        default:
            return state;
    }
}