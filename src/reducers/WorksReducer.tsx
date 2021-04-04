import { AnyAction } from "redux";
import { IComment } from "../utils/Rest";

export interface WorksState {
    works: IComment[]
};

export enum WorksActions {
    'GET' = 'GET_WORKS',
}

export function works(state: WorksState = { works: [] }, action: AnyAction) {
    switch (action.type) {
        case WorksActions.GET: {
            return {
                works: action.works
            };
        }
        default:
            return state;
    }
}