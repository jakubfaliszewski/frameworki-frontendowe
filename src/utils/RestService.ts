import { IComment, IPhoto, IPost, IUser } from "./Rest";

const API = 'https://jsonplaceholder.typicode.com';

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
        const photo = await this.getUserPhoto(user.id)
        user.photo = photo;

        return user;
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
        const postsWithRel =  Promise.all(posts.map(async (post) => {
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
        const commentsWithRel =  Promise.all(comments.map(async (comment) => {
            comment.post = await this.getPost(comment.postId).then(response => response);
            
            return comment;
        }));

        return commentsWithRel;
    }
}


export default RestService;