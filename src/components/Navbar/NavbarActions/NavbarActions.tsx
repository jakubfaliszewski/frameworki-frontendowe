import { ImBell, ImBubbles, ImHome } from "react-icons/im";
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import ActionButton from './../../common/ActionButton/ActionButton';
import { IPost } from './../../../utils/Rest';
import PostsNotif from './../PostsNotif/PostsNotif';
import RestService from './../../../utils/RestService';
import styles from "./NavbarActions.module.scss";

type P = RouteComponentProps;

type S = {
    posts: Array<IPost>,
    postsVisible: boolean
}

class NavbarActions extends Component<P, S> {

    constructor(props: P) {
        super(props);
        this.state = {
            posts: [],
            postsVisible: false
        }

        this.goToHome = this.goToHome.bind(this);
        this.openPostsNotif = this.openPostsNotif.bind(this);
    }

    componentDidMount() {
        const service = new RestService();
        service.getPublications(3).then(posts => {
            this.setState({
                posts: posts
            })
        });
    }

    goToHome() {
        this.props.history.push('/');
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
                    <ActionButton className={styles.actionBtn} icon={ImHome} disabled={this.props.location.pathname === '/'} onClick={this.goToHome} />
                    <ActionButton className={styles.actionBtn} icon={ImBubbles} disabled />
                    <ActionButton className={styles.actionBtn} icon={ImBell} disabled={this.state.posts.length === 0} actions={this.state.posts} onClick={this.openPostsNotif} />
                </div>
                {this.state.postsVisible && <PostsNotif posts={this.state.posts} />}
            </>
        );
    }
}

export default withRouter(props => <NavbarActions {...props} />);;
