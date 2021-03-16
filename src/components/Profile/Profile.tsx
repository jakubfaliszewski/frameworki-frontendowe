import { IUser, IUserLocal } from '../../utils/Rest';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { BsBriefcase } from "react-icons/bs";
import Button from '../common/Button/Button';
import { FiMessageCircle } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import MainInfo from './MainInfo/MainInfo';
import RestService from '../../utils/RestService';
import styles from "./Profile.module.scss";

interface ProfileParams {
    userId: number;
}

type P = RouteComponentProps;
type S = {
    profile: IUser | null
}

class Profile extends Component<P, S> {
    service = new RestService();
    validTemp: any = {};

    constructor(props: P) {
        super(props);
        this.state = {
            profile: null,
        }

        this.getProfile = this.getProfile.bind(this);
        this.changeState = this.changeState.bind(this);
    }

    componentDidMount() {
        const userId = Number((this.props.match.params as ProfileParams).userId);
        this.getProfile(userId);
    }

    componentDidUpdate() {
        const userId = Number((this.props.match.params as ProfileParams).userId);
        console.log(userId);
        if (this.state.profile?.id !== userId) {
            this.getProfile(userId);
        }
    }

    getProfile(id: number) {
        this.service.getUserProfile(id).then(profile => {
            this.setState({
                profile: profile
            })
        });
    }

    changeState(obj: any) {
        this.setState(obj);
    }

    render() {
        const profile = this.state.profile as IUserLocal;

        return profile
            ? <section className={styles.Profile}>
                <div className={styles.ProfileHeader}>
                    <Button className={styles.ProfileHeaderButton} label={"Message"} icon={FiMessageCircle} />
                    <Button className={styles.ProfileHeaderButton} label={"Create a request"} icon={HiOutlineDocumentText} />
                    <Button className={styles.ProfileHeaderButton} label={"Add to cluster"} icon={BsBriefcase} />
                </div>
                <MainInfo profile={profile} changeState={this.changeState} />
            </section>
            : <div></div>;
    }
}

export default withRouter(props => <Profile {...props} />);;