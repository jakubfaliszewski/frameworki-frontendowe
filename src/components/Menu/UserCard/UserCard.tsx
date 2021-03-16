import React, { Component } from 'react';

import { IUser } from './../../../utils/Rest';
import Img from '../../common/Img/Img';
import { Link } from 'react-router-dom';
import RestService from '../../../utils/RestService';
import cx from 'classnames';
import styles from "./UserCard.module.scss";

type S = {
    profile?: IUser,
}

class UserCard extends Component<{}, S> {
    constructor(props: {}) {
        super(props);
        this.state = {
            profile: undefined,
        }

    }

    componentDidMount() {
        const service = new RestService();
        service.getUserProfile(1).then(profile => {
            this.setState({
                profile: profile
            })
        });
    }

    render() {
        const user = this.state.profile;

        return (
            <Link to="/profile/1">
                <div className={styles.UserCard}>
                    <Img skeletonize className={styles.UserCardPic} src={user?.photo?.url} alt="Profile pic" />
                    <h3 className={cx('header-3', styles.UserCardName)}>{user?.name}</h3>
                    <h4 className={cx('header-4', styles.UserCardPosition)}>Intern - {user?.company.name}</h4>
                    <hr className={styles.UserCardHr}/>
                </div>
            </Link >
        );
    }
}

export default UserCard;
