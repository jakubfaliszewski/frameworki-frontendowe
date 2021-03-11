
import React, { Component, RefObject } from 'react';
import styles from "./ActionButton.module.scss";
import cx from 'classnames';
import { ImSearch } from "react-icons/im";
import { IconType } from 'react-icons';
import { Post } from './../../../utils/IRest';

type P = {
    className: string,
    text: string,
    icon: IconType,
    actions: Array<Post>,
    onClick: Function
}

class ActionButton extends Component<P, {}> {
    static defaultProps = {
        className: null,
        icon: null,
        text: null,
        actions: [],
        onClick: () => null
    }

    render() {
        const { text, icon, className, onClick, actions } = this.props;
        const Icon = icon;
        const actionsCount = actions.length;
        const label = actionsCount === 0 ? 'No notifications' : `You have ${actionsCount} notifications`;
        return (
            <div className={cx(className, styles.ActionButtonContainer)} >
                {actionsCount > 0 && <div className={styles.ActionButtonCount}>
                    {actionsCount}
                </div>}
                <button aria-label={label} type="button" className={cx(styles.ActionButton, actionsCount > 0 ? styles.ActionButtonWthCnt : styles.ActionButtonInactive)} onClick={(ev) => onClick(ev)}>
                    {this.props.text}
                    {Icon ? <Icon /> : null}
                </button>
            </div>
        );
    }
}

export default ActionButton;
