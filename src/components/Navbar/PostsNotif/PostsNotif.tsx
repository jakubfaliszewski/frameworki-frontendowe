import React, { Component } from 'react';

import {
    Link
} from "react-router-dom";
import { Post } from './../../../utils/IRest';
import cx from 'classnames';
import styles from "./PostsNotif.module.scss";

type P = {
    posts: Array<Post>,
}

class PostsNotif extends Component<P> {

    generateContent() {
        const postArray = [...this.props.posts];

        return postArray.map((post, i) =>
            <Link key={`notifPost_${i}`} className={styles.post} to="/">
                <h2 className={cx(styles.postTitle, 'firstLetterUpper')}>{post.title}</h2>
                <p className={cx(styles.postContent, 'firstLetterUpper')}>{post.body}</p>
                <time className={styles.postTime} dateTime={`PT${i+2}H`}>{i+2} hours ago</time>
            </Link>
        );
    }

    render() {
        return (
            <>
                <div className={styles.PostsNotif}>
                    {this.generateContent()}
                </div>
            </>
        );
    }
}

export default PostsNotif;
