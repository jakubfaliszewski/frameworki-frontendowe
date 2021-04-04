import { AnyAction, Dispatch } from 'redux';
import { IoAdd, IoNewspaperOutline } from 'react-icons/io5'
import { IoIosPeople, IoMdPersonAdd } from 'react-icons/io'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import Button from '../../common/Button/Button';
import { FaRegBuilding } from 'react-icons/fa'
import { GiAtom } from 'react-icons/gi'
import { IStore } from './../../../store';
import Img from '../../common/Img/Img';
import { UsersState } from '../../../reducers/UsersReducer';
import { connect } from 'react-redux';
import cx from 'classnames';
import styles from "./UserCard.module.scss";
import { usersFetchData } from './../../../actions/UserActions';

const USER_ID = 1;

interface StateProps {
    users: UsersState['users']
}

interface DispatchProps {
    fetchData: (id: number) => void
}

type P = RouteComponentProps & StateProps & DispatchProps;

class UserCard extends Component<P> {

    componentDidMount() {
        this.props.fetchData(1);
    }

    goTo(route: string) {
        this.props.history.push(route);
    }

    render() {
        const user = this.props.users.find((v) => v.id === USER_ID)?.user;

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
                        <Button className={styles.ButtonFull} label="Your network" icon={IoIosPeople} onClick={() => this.goTo('/404')} />
                        <Button iconOnly icon={IoMdPersonAdd} border />
                        <Button className={styles.ButtonFull} label="Your publications" icon={IoNewspaperOutline} onClick={() => this.goTo('/404')} />
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

const mapStateToProps = (state: IStore) => {
    return {
        users: state.users.users,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        fetchData: (id: number) => dispatch(usersFetchData(id) as unknown as AnyAction)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserCard));