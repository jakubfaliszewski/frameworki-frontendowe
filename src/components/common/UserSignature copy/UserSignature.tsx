import React, { Component, RefObject } from 'react';
import { formatDate, getRandomDate } from '../../../utils/dateUtils';

import { IPost } from './../../../utils/Rest';
import { IconType } from 'react-icons';
import { ImSearch } from "react-icons/im";
import cx from 'classnames';
import styles from "./UserSignature.module.scss";

type P = {
    className: string,
    name: string,
    onWhiteBg: boolean,
    imageSrc: string
}

class UserSignature extends Component<P, {}> {

    randomDate = formatDate(getRandomDate());

    constructor(props: P) {
        super(props)
    }

    static defaultProps = {
        className: null,
        name: null,
        onWhiteBg: false,
        imageSrc: null
    }

    render() {
        const { name, imageSrc, className, onWhiteBg } = this.props;

        return (
            <div className={cx(className, styles.UserSignature, onWhiteBg ? styles.UserSignatureDark : null)}>
                <time>{this.randomDate}</time>
                <img className={styles.UserAvatar} src={imageSrc} />
                <p>{name}</p>
            </div >
        );
    }
}

export default UserSignature;
