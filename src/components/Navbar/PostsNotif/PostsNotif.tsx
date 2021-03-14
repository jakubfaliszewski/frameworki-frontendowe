import React, { Component } from 'react';

import { IPost } from './../../../utils/Rest';
import {
    Link
} from "react-router-dom";
import cx from 'classnames';
import styles from "./PostsNotif.module.scss";

type P = {
    posts: Array<IPost>,
}

class PostsNotif extends Component<P> {

    generateContent() {
        const postArray = [...this.props.posts];

        return postArray.map((post, i) =>
            <Link key={`notifPost_${i}`} className={styles.post} to={`/${i}`}>
                <img src={post.photo?.thumbnailUrl} className={styles.postImage} />
                <div>
                    <h5 className={cx(styles.postTitle, 'header-5 firstLetterUpper')}>{post.title}</h5>
                    <p className={cx(styles.postContent, 'firstLetterUpper')}>{post.body}</p>
                    <time className={styles.postTime} dateTime={`PT${i + 2}H`}>{i + 2} hours ago</time>
                </div>
            </Link>
        );
    }

    render() {
        return (
            <>
                <div className={styles.PostsNotif}>
                    <h4 className={'header-4'}>You have 3 new publications</h4>
                    {this.generateContent()}
                </div>
            </>
        );
    }
}

export default PostsNotif;
