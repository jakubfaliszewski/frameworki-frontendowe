import { API, argsToString } from "../utils/restUtils";
import { PublicationsActions, PublicationsState } from "../reducers/PublicationsReducer";

import { Dispatch } from "redux";
import { IPost } from "../utils/Rest";
import { IStore } from "../store";
import { UsersState } from "../reducers/UsersReducer";

export function publicationsFetchDataSuccess(publications: IPost[]) {
    return {
        type: PublicationsActions.GET,
        publications
    };
}

function getPhoto(id: number): Promise<any> {
    return fetch(`${API}/photos/${id}`)
        .then(response => response.json())
}

export function publicationsFetchData(limit?: number) {
    const args = {
        '_limit': limit
    };
    const argString = argsToString(args);

    return (dispatch: Dispatch, stateF: any) => {
        const state = stateF() as IStore;
        const publicationsLocal = state.publications as PublicationsState;
        const users = state.users as UsersState;
        if (publicationsLocal.publications.length > 0) {
            const pubs = publicationsLocal.publications.map((v) => {
                const userById = users.users.find(user => v.userId === user.id);
                v.user = userById?.user;
                return v;
            });
            return dispatch(publicationsFetchDataSuccess(pubs));
        }
        fetch(`${API}/posts${argString}`)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((publicationsFetch: IPost[]) => {
                return Promise.all(publicationsFetch.map(async (publ) => {
                    publ.photo =  await getPhoto(publ.id);

                    return publ;
                })).then((publs) => {
                    return dispatch(publicationsFetchDataSuccess(publs));
                });
            })
    };
}