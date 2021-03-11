import { ImBell, ImBubbles, ImHome } from "react-icons/im";
import React, { Component } from 'react';

import ActionButton from './../../common/ActionButton/ActionButton';
import { Post } from './../../../utils/IRest';
import PostsNotif from './../PostsNotif/PostsNotif';
import RestService from './../../../utils/RestService';
import styles from "./NavbarActions.module.scss";

type S = {
    posts: Array<Post>,
    postsVisible: boolean
}

class NavbarActions extends Component<{}, S> {

    constructor(props: {}) {
        super(props);
        this.state = {
            posts: [],
            postsVisible: false
        }

        this.openPostsNotif = this.openPostsNotif.bind(this);
    }

    componentDidMount() {
        const service = new RestService();
        service.getPosts().then(posts => {
            // fake limit
            this.setState({
                posts: posts.slice(1, 4)
            })
        });
    }


    openPostsNotif() {
        const newState = !this.state.postsVisible;
        this.setState({
            postsVisible: newState
        })
    }

    render() {
        return (
            <>
                <div className={styles.NavbarActions}>
                    <ActionButton className={styles.actionBtn} icon={ImHome} />
                    <ActionButton className={styles.actionBtn} icon={ImBubbles} actions={[]} />
                    <ActionButton className={styles.actionBtn} icon={ImBell} actions={this.state.posts} onClick={this.openPostsNotif} />
                </div>
                {this.state.postsVisible && <PostsNotif posts={this.state.posts} />}
            </>
        );
    }
}

export default NavbarActions;
