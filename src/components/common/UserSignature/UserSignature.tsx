import { AnyAction, Dispatch } from 'redux';
import React, { Component } from 'react';
import { formatDate, getRandomDate } from '../../../utils/dateUtils';
import { getRandomNumber, isPrime } from '../../../utils/mathUtils';

import { BiBuilding } from "react-icons/bi";
import { IStore } from '../../../store';
import Img from '../Img/Img';
import { Link } from 'react-router-dom';
import { RiNewspaperLine } from "react-icons/ri";
import { UsersState } from '../../../reducers/UsersReducer';
import { connect } from 'react-redux';
import cx from 'classnames';
import styles from "./UserSignature.module.scss";
import { usersFetchData } from './../../../actions/UserActions';

interface StateProps {
    users: UsersState['users']
}

interface DispatchProps {
    fetchData: (id: number) => void
}

type P = {
    className: string,
    onWhiteBg: boolean,
    userId: number,
    type: 'user' | 'company'
} & StateProps & DispatchProps

class UserSignature extends Component<P, {}> {

    randomDate = getRandomDate();
    isCompany: boolean = false;

    constructor(props: P) {
        super(props);
        this.props.fetchData(props.userId);
        if (props.type === 'company') {
            this.isCompany = isPrime(getRandomNumber());
        }
    }

    static defaultProps: P = {
        userId: null,
        className: null,
        onWhiteBg: false,
        type: 'user',
        users: [],
        fetchData: null
    }

    renderComType() {
        if (this.isCompany) {
            return <>
                <div className={styles.Company}>
                    <BiBuilding />
                    <span>Company</span>
                </div>
            </>
        }

        return <div className={styles.Company}>
            <RiNewspaperLine />
            <span>Contractor</span>
        </div>
    }

    contentSwitch() {
        const { type, userId } = this.props;
        const user = this.props.users.find(v => v.id === userId)?.user;
        if (user) {

            switch (type) {
                case 'user':
                    return <>
                        <time>{formatDate(this.randomDate)}</time>
                        <Link to={`/profile/${userId}`} className={styles.userLink}>
                            <Img skeletonize className={styles.UserAvatar} src={user.photo.thumbnailUrl} alt={`${user.name} avatar`} />
                            <p>{user.name}</p>
                        </Link>
                    </>;
                case 'company':
                    return <>
                        <Img skeletonize className={styles.UserAvatar} src={user.photo.thumbnailUrl} alt={`${user.company.name} logo`} />
                        <p>{user.company.name}</p>
                        <div className={styles.separator}></div>
                        {this.renderComType()}
                        <div className={styles.separator}></div>
                        <Link to={`/profile/${userId}`} className={styles.userLink}>
                            <time>Updated {formatDate(this.randomDate, true)} by {user.name}</time>
                        </Link>
                    </>;
            }
        }

        return null;
    }


    render() {
        const { className, onWhiteBg } = this.props;

        return (
            <div className={cx(className, styles.UserSignature, onWhiteBg ? styles.UserSignatureDark : null)}>
                {this.contentSwitch()}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserSignature);
