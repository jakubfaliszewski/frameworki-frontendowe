import { AnyAction } from "redux";
import { IComment } from "../utils/Rest";

export interface WorksState {
    works: IComment[]
};

export function works(state: WorksState = { works: [] }, action: AnyAction) {
    switch (action.type) {
        case 'GET_WORKS': {
            return {
                works: action.works
            };
        }
        default:
            return state;
    }
}