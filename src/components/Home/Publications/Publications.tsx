import { AnyAction, Dispatch } from 'redux';
import React, { Component } from 'react';

import Button from '../../common/Button/Button';
import { IStore } from '../../../store';
import Img from '../../common/Img/Img';
import { Link } from "react-router-dom";
import { PublicationsState } from '../../../reducers/PublicationsReducer';
import Skeleton from './../../common/Skeleton/Skeleton';
import UserSignature from './../../common/UserSignature/UserSignature';
import { connect } from 'react-redux';
import { publicationsFetchData } from '../../../actions/PublicationsActions';
import styles from "./Publications.module.scss";

interface StateProps {
    publications: PublicationsState['publications']
}

interface DispatchProps {
    fetchData: (limit: number) => void
}
type P = StateProps & DispatchProps;

class Publications extends Component<P> {
    
    componentDidMount() {
        this.props.fetchData(4);
    }

    getFirstPostTile() {
        const post = this.props.publications[0];

        return (post ? <article className={styles.PublicationsTile} >
            <Img skeletonize className={styles.bgImage} src={post.photo?.url} alt={post.photo?.title} />
            <div className={styles.PublicationsTileContent}>
                <h3 className={'header-3 firstLetterUpper'}>{post.title}</h3>
                <UserSignature userId={post.userId} />
            </div>
        </article >
            : <Skeleton type="articleTile" />
        )
    }

    getPosts() {
        const posts = [...this.props.publications].slice(1);

        return (posts.length > 0 ? posts.map((post, i) =>
            <article key={`post_${i}`} className={styles.PublicationsArticle}>
                <Img skeletonize className={styles.PublicationsArticleImage} src={post.photo?.url} alt={post.photo?.title} />
                <div>
                    <h3 className={'header-3 firstLetterUpper'}>{post.title}</h3>
                    <UserSignature onWhiteBg userId={post.userId} />
                </div>
            </article>) : <Skeleton type="article" count={3} />);
    }

    render() {
        return (
            <section className={styles.Publications}>
                {this.getFirstPostTile()}
                <div className={styles.PublicationsContainer}>
                    <h2 className={'header-2'}>Latest publications</h2>
                    {this.getPosts()}
                    <Link className={styles.PublicationsMore} to='/404'>
                        <Button label="See more publications" />
                    </Link>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state: IStore) => {
    return {
        publications: state.publications.publications,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        fetchData: (id: number) => dispatch(publicationsFetchData(id) as unknown as AnyAction)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Publications);