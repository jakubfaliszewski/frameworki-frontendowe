import React, { Component } from 'react';
import { formatDate, getRandomDate } from '../../../utils/dateUtils';
import { getRandomNumber, isPrime } from '../../../utils/mathUtils';

import { BiBuilding } from "react-icons/bi";
import Img from '../Img/Img';
import { Link } from 'react-router-dom';
import { RiNewspaperLine } from "react-icons/ri";
import cx from 'classnames';
import styles from "./UserSignature.module.scss";

type P = {
    className: string,
    name: string,
    company: string,
    onWhiteBg: boolean,
    imageSrc: string,
    userId: number,
    type: 'user' | 'company'
}

class UserSignature extends Component<P, {}> {

    randomDate = getRandomDate();
    isCompany: boolean = false;

    constructor(props: P) {
        super(props)
        if (props.type === 'company') {
            this.isCompany = isPrime(getRandomNumber());
        }
    }

    static defaultProps = {
        className: null,
        name: null,
        company: null,
        onWhiteBg: false,
        imageSrc: null,
        type: 'user'
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
        const { name, imageSrc, company, type, userId } = this.props;

        switch (type) {
            case 'user':
                return <>
                    <time>{formatDate(this.randomDate)}</time>
                    <Link to={`/profile/${userId}`} className={styles.userLink}>
                        <Img skeletonize className={styles.UserAvatar} src={imageSrc} alt={`${name} avatar`} />
                        <p>{name}</p>
                    </Link>
                </>;
            case 'company':
                return <>
                    <Img skeletonize className={styles.UserAvatar} src={imageSrc} alt={`${company} logo`} />
                    <p>{company}</p>
                    <div className={styles.separator}></div>
                    {this.renderComType()}
                    <div className={styles.separator}></div>
                    <Link to={`/profile/${userId}`} className={styles.userLink}>
                        <time>Updated {formatDate(this.randomDate, true)} by {name}</time>
                    </Link>
                </>;
        }
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

export default UserSignature;