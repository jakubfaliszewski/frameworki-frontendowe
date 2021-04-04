import { AnyAction } from "redux";
import { IPost } from "../utils/Rest";

export interface PublicationsState {
    publications: IPost[]
};

export enum PublicationsActions {
    'GET' = 'GET_PUBLICATIONS',
}

export function publications(state: PublicationsState = { publications: [] }, action: AnyAction) {
    switch (action.type) {
        case PublicationsActions.GET: {
            return {
                publications: action.publications
            };
        }
        default:
            return state;
    }
}
