import { ImBell, ImBubbles, ImHome } from "react-icons/im";
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import ActionButton from './../../common/ActionButton/ActionButton';
import { INotification } from "../../../reducers/NotificationReducer";
import { IStore } from './../../../store';
import NavbarNotifications from "./../NavbarNotifications/NavbarNotifications";
import { connect } from 'react-redux';
import styles from "./NavbarActions.module.scss";

interface StateProps {
    notifications: INotification[]
}

type P = StateProps & RouteComponentProps;

type S = {
    postsVisible: boolean
}

class NavbarActions extends Component<P, S> {
    
    constructor(props: P) {
        super(props);
        this.state = {
            postsVisible: false
        }

        this.goToHome = this.goToHome.bind(this);
        this.openPostsNotif = this.openPostsNotif.bind(this);
        this.closePostsNotif = this.closePostsNotif.bind(this);
    }

    goToHome() {
        this.props.history.push('/');
    }

    openPostsNotif() {
        this.setState((prevState) => {
            return {
                postsVisible: !prevState.postsVisible
            }
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
                {this.state.postsVisible && <NavbarNotifications closeMethod={this.closePostsNotif}/>}
            </>
        );
    }
}

const mapStateToProps = (state: IStore) => ({
    notifications: state.NotificationReducer.notifications
});

export default connect(mapStateToProps)(withRouter(NavbarActions));