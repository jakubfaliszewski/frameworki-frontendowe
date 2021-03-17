import { ImBell, ImBubbles, ImHome } from "react-icons/im";
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import ActionButton from './../../common/ActionButton/ActionButton';
import { IPost } from './../../../utils/Rest';
import { IStore } from './../../../store';
import NavbarNotifications from "./../NavbarNotifications/NavbarNotifications";
import { NotificationState } from "../../../reducers/NotificationReducer";
import RestService from './../../../utils/RestService';
import { connect } from 'react-redux';
import styles from "./NavbarActions.module.scss";

type P = NotificationState & RouteComponentProps;

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
        this.closePostsNotif = this.closePostsNotif.bind(this);
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

    closePostsNotif() {
        this.setState({
            postsVisible: false
        })
    }

    render() {
        const notifications = this.props.notifications;
        
        return (
            <>
                <div className={styles.NavbarActions}>
                    <ActionButton className={styles.actionBtn} icon={ImHome} disabled={this.props.location.pathname === '/'} onClick={this.goToHome} />
                    <ActionButton className={styles.actionBtn} icon={ImBubbles} disabled />
                    <ActionButton className={styles.actionBtn} icon={ImBell} disabled={notifications.length === 0} actions={notifications.length} onClick={this.openPostsNotif} />
                </div>
                {this.state.postsVisible && <NavbarNotifications notifications={notifications} closeMethod={this.closePostsNotif}/>}
            </>
        );
    }
}

const mapStateToProps = (state: IStore) => ({
    notifications: state.NotificationReducer.notifications
});

export default connect(mapStateToProps)(withRouter(NavbarActions));