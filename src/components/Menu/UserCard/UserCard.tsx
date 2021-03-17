import { IoAdd, IoNewspaperOutline } from 'react-icons/io5'
import { IoIosPeople, IoMdPersonAdd } from 'react-icons/io'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import Button from '../../common/Button/Button';
import { FaRegBuilding } from 'react-icons/fa'
import { GiAtom } from 'react-icons/gi'
import { IUser } from './../../../utils/Rest';
import Img from '../../common/Img/Img';
import RestService from '../../../utils/RestService';
import cx from 'classnames';
import styles from "./UserCard.module.scss";

type S = {
    profile?: IUser,
}

class UserCard extends Component<RouteComponentProps, S> {
    constructor(props: RouteComponentProps) {
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

    goTo(route: string) {
        this.props.history.push(route);
    }

    render() {
        const user = this.state.profile;

        return (
            <>
                <div className={styles.UserCard}>
                    <Link to="/profile/1" className={styles.UserCardLink}>
                        <Img skeletonize className={styles.UserCardPic} src={user?.photo?.url} alt="Profile pic" />
                        <h3 className={cx('header-3', styles.UserCardName)}>{user?.name}</h3>
                        <h4 className={cx('header-4', styles.UserCardPosition)}>Intern - {user?.company.name}</h4>
                    </Link >
                    <hr className={styles.UserCardHr} />
                    <div className={styles.UserCardButtons}>
                        <Button className={styles.ButtonFull} label="Your network" icon={IoIosPeople} />
                        <Button iconOnly icon={IoMdPersonAdd} border />
                        <Button className={styles.ButtonFull} label="Your publications" icon={IoNewspaperOutline} />
                        <Button iconOnly icon={IoAdd} border />
                    </div>
                </div>
                <div className={styles.UserTransparent}>
                    <Button className={styles.Button} label="Publications" icon={IoNewspaperOutline} onClick={() => this.goTo('/404')} />
                    <Button className={styles.Button} label="Ecosystem" icon={GiAtom} onClick={() => this.goTo('/404')} />
                    <Button className={styles.Button} label="Your Entities" icon={FaRegBuilding} onClick={() => this.goTo('/entities')} />
                </div>
            </>
        );
    }
}

export default withRouter(UserCard);;
