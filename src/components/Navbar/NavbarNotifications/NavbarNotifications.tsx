import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import { NotificationActions, NotificationReducer, NotificationState } from '../../../reducers/NotificationReducer';
import React, { Component } from 'react';

import Img from '../../common/Img/Img';
import {
    Link
} from "react-router-dom";
import { VscClose } from 'react-icons/vsc';
import { connect } from 'react-redux';
import cx from 'classnames';
import { formatDate } from './../../../utils/dateUtils';
import styles from "./NavbarNotifications.module.scss";

type P = {
    notifications: NotificationState["notifications"],
    closeMethod: Function,
    dispatch: Dispatch<AnyAction>
}

class NavbarNotifications extends Component<P> {

    constructor(props: P) {
        super(props);
        this.closeNotifications = this.closeNotifications.bind(this);
    }
    componentDidMount() {
        setTimeout(() => {
            window.addEventListener('click', this.closeNotifications);
        }, 0);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.closeNotifications);
    }

    closeNotifications() {
        this.props.closeMethod();
    }

    removeNotif(id?: string) {
        if (id) {
            this.props.dispatch({
                type: NotificationActions.REMOVE, payload: {
                    notificationId: id
                }
            });
        }
    }

    generateContent() {
        const notifArray = [...this.props.notifications];

        return notifArray.map((notif, i) => <div className={styles.postContainer} key={`notif_${i}`}>
            <Link className={styles.post} to={`/profile/${notif.user.id}`}>
                <Img skeletonize src={notif.user?.photo?.thumbnailUrl} className={styles.postImage} alt={notif.user?.photo?.title} />
                <div>
                    <h5 className={cx(styles.postTitle, 'header-5 firstLetterUpper')}>{notif.title}</h5>
                    <time className={styles.postTime}>{formatDate(notif.time, true)}</time>
                </div>
            </Link>
            <button className={styles.postClose} onClick={() => this.removeNotif(notif.id)}><VscClose /></button>
        </div>
        );
    }

    render() {
        return (
            <>
                <div className={styles.NavbarNotifications}>
                    <h4 className={'header-4'}>You have {this.props.notifications.length} new notification{this.props.notifications.length > 1 ? 's' : ''}</h4>
                    {this.generateContent()}
                </div>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return bindActionCreators({
        ...NotificationReducer
    }, dispatch);
};

export default connect(mapDispatchToProps)(NavbarNotifications);
