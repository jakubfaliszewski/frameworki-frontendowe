import React, { Component } from 'react';

import { IUser } from './../../../utils/Rest';
import RestService from '../../../utils/RestService';
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
        return (
            <div className={styles.UserCard}>

            </div>
        );
    }
}

export default UserCard;
