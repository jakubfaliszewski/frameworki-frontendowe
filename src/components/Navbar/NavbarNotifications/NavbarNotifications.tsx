import React, { Component } from 'react';

import Img from '../../common/Img/Img';
import {
    Link
} from "react-router-dom";
import { NotificationState } from '../../../reducers/NotificationReducer';
import cx from 'classnames';
import { formatDate } from './../../../utils/dateUtils';
import styles from "./NavbarNotifications.module.scss";

type P = {
    notifications: NotificationState["notifications"],
}

class NavbarNotifications extends Component<P> {

    generateContent() {
        const notifArray = [...this.props.notifications];

        return notifArray.map((notif, i) =>
            <Link key={`notif_${i}`} className={styles.post} to={`/profile/${i}`}>
                <Img skeletonize src={notif.user?.photo?.thumbnailUrl} className={styles.postImage} alt={notif.user?.photo?.title} />
                <div>
                    <h5 className={cx(styles.postTitle, 'header-5 firstLetterUpper')}>{notif.title}</h5>
                    <time className={styles.postTime}>{formatDate(notif.time, true)}</time>
                </div>
            </Link>
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

export default NavbarNotifications;
