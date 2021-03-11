import { Post } from "./IRest";

class ItemService {
    async getPosts() : Promise<Array<Post>> {
        return fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json());
    }
}


export default ItemService;