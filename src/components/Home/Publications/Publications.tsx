import React, { Component } from 'react';

import { IPost } from '../../../utils/Rest';
import Img from '../../common/Img/Img';
import { Link } from "react-router-dom";
import RestService from '../../../utils/RestService';
import Skeleton from './../../common/Skeleton/Skeleton';
import UserSignature from './../../common/UserSignature/UserSignature';
import cx from 'classnames';
import styles from "./Publications.module.scss";

type S = {
    posts: Array<IPost>
}

class Publications extends Component<{}, S> {

    constructor(props: {}) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        const service = new RestService();
        service.getPublications(4).then(posts => {
            this.setState({
                posts: posts
            })
        });
    }

    getFirstPostTile() {
        const post = this.state.posts[0];

        return (post ? <article className={styles.PublicationsTile} >
            <Img skeletonize className={styles.bgImage} src={post.photo?.url} alt={post.photo?.title} />
            <div className={styles.PublicationsTileContent}>
                <h3 className={'header-3 firstLetterUpper'}>{post.title}</h3>
                <UserSignature name={post.user?.name} imageSrc={post.photo?.thumbnailUrl} />
            </div>
        </article >
            : <Skeleton type="articleTile" />
        )
    }

    getPosts() {
        const posts = [...this.state.posts].slice(1);

        return (posts.length > 0 ? posts.map((post, i) =>
            <article key={`post_${i}`} className={styles.PublicationsArticle}>
                <Img skeletonize className={styles.PublicationsArticleImage} src={post.photo?.url} alt={post.photo?.title} />
                <div>
                    <h3 className={'header-3 firstLetterUpper'}>{post.title}</h3>
                    <UserSignature onWhiteBg name={post.user?.name} imageSrc={post.photo?.thumbnailUrl} />
                </div>
            </article>) : <Skeleton type="article" count={3}/>);
    }

    render() {
        return (
            <section className={styles.Publications}>
                {this.getFirstPostTile()}
                <div className={styles.PublicationsContainer}>
                    <h2 className={'header-2'}>Latest publications</h2>
                    {this.getPosts()}
                    <Link className={styles.PublicationsMore} to='/'>See more publications</Link>
                </div>
            </section>
        );
    }
}

export default Publications;