import { IComment, IFakeCompany, IPhoto, IPost, IUser, IWorkspace } from "./Rest";

import workspaces from './../assets/workspaces.json'

const API = 'https://jsonplaceholder.typicode.com';

class RestService {

    private _statusToText(status: number): void {

        switch (status) {
            case 200: console.info("OK!"); break;
            default: console.error("Something went berserk, sorry!")
        }
    }

    private _argsToString(args: object): string {
        let argsString: string = '?';
        for (const [key, value] of Object.entries(args)) {
            if (value) {
                argsString += `${key}=${value}${argsString.length > 1 ? '&' : ''}`;
            }
        }

        return argsString.length > 1 ? argsString : '';
    }

    async getUserPhoto(id: number): Promise<IPhoto> {
        return fetch(`${API}/photos/${id}`)
            .then(response => response.json())
    }

    async getUserProfile(id?: number): Promise<IUser> {
        const user: IUser = await fetch(`${API}/users/${id}`).then(response => response.json());
        if (Object.keys(user).length !== 0) {
            const photo = await this.getUserPhoto(user.id)
            user.photo = photo;
        }

        return user;
    }

    setUserProfile(id: number, data: IUser): void {
        fetch(`${API}/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((response) => {
                return this._statusToText(response.status);
            })
    }

    async getPost(id?: number): Promise<IPost> {
        const post: IPost = await fetch(`${API}/posts/${id}`).then(response => response.json());
        const user = await this.getUserProfile(post.userId)
        post.user = user;

        return post;
    }

    async getPublications(limit?: number): Promise<Array<IPost>> {
        const args = {
            '_limit': limit
        };
        const argString = this._argsToString(args);
        const posts: Array<IPost> = await fetch(`${API}/posts${argString}`).then(response => response.json());
        const postsWithRel = Promise.all(posts.map(async (post) => {
            post.user = await this.getUserProfile(post.userId).then(response => response);
            post.photo = await this.getUserPhoto(post.userId).then(response => response);

            return post;
        }));

        return postsWithRel;
    }

    async getWork(limit?: number): Promise<Array<IComment>> {
        const args = {
            '_limit': limit
        };
        const argString = this._argsToString(args);
        const comments: Array<IComment> = await fetch(`${API}/comments${argString}`).then(response => response.json());
        const commentsWithRel = Promise.all(comments.map(async (comment) => {
            comment.post = await this.getPost(comment.postId).then(response => response);

            return comment;
        }));

        return commentsWithRel;
    }

    async getFakeCompanies(): Promise<Array<IFakeCompany>> {
        let users: Array<IUser> = await fetch(`${API}/users`).then(response => response.json());
        users = [...users, ...users, ...users];
        let address = Promise.all(users.map(async (user, i) => {
            const newAddress: IFakeCompany = {
                id: i,
                address: `${user.address.street} ${user.address.suite}, ${user.address.city}`,
                name: user.company.name
            }

            newAddress.photo = await this.getUserPhoto(user.id).then(response => response);

            return newAddress;
        }));

        return address;
    }

    getWorkspace(id: number): IWorkspace | undefined {
        return workspaces.find((v) => v.id === id);
    }

    getWorkspaces(): IWorkspace[] {
        return workspaces;
    }
}


export default RestService;