import { AnyAction } from "redux";
import { IPost } from "../utils/Rest";

export interface PublicationsState {
    publications: IPost[]
};

export function publications(state: PublicationsState = { publications: [] }, action: AnyAction) {
    switch (action.type) {
        case 'GET_PUBLICATIONS': {
            return {
                publications: action.publications
            };
        }
        default:
            return state;
    }
}
