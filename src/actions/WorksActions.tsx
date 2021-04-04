import { API, argsToString } from "../utils/restUtils";
import { IComment, IPost } from "../utils/Rest";
import { WorksActions, WorksState } from "../reducers/WorksReducer";

import { Dispatch } from "redux";
import { IStore } from "../store";
import { UsersState } from "../reducers/UsersReducer";

export function worksFetchDataSuccess(works: IComment[]) {
    return {
        type: WorksActions.GET,
        works
    };
}

async function getPost(id: number, state: IStore) {
    const post: IPost = await fetch(`${API}/posts/${id}`).then(response => response.json());
    const users = state.users as UsersState;
    const userById = users.users.find(v => v.id === post.userId);
    post.user = userById?.user;
    return post;
}

export function worksFetchData(limit?: number) {
    const args = {
        '_limit': limit
    };
    const argString = argsToString(args);
    return (dispatch: Dispatch, stateF: any) => {
        const state = stateF() as IStore;
        const worksLocal = state.works as WorksState;
        const users = state.users as UsersState;
        if (worksLocal.works.length > 0) {
            const works = worksLocal.works.map((v) => {
                const userById = users.users.find(user => v.post?.userId === user.id);
                if (v.post) {
                    v.post.user = userById?.user;
                }
                return v;
            });
            return dispatch(worksFetchDataSuccess(works));
        }
        fetch(`${API}/comments${argString}`)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then(async (worksFetch: IComment[]) => {
                return Promise.all(worksFetch.map(async (work) => {
                    const post = await (await getPost(work.postId, state).then(resp => resp));
                    work.post = post;

                    return work;
                })).then((works) => {
                    return dispatch(worksFetchDataSuccess(works));
                });
            })
    };
}