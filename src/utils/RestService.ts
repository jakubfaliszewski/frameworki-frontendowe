import { IFakeCompany, IPhoto, IPost, IUser, IWorkspace } from "./Rest";

import { API } from "./restUtils";
import workspaces from './../assets/workspaces.json'

class RestService {

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