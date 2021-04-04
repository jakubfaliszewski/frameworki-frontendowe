import React, { Component } from 'react';

import { IconType } from 'react-icons';
import cx from 'classnames';
import styles from "./ActionButton.module.scss";

type P = {
    className: string,
    text: string,
    disabled: boolean,
    icon: IconType,
    actions: number,
    onClick: Function
}

class ActionButton extends Component<P, {}> {
    static defaultProps: P = {
        className: null,
        icon: null,
        disabled: false,
        text: null,
        actions: 0,
        onClick: null
    }

    render() {
        const { icon, className, onClick, actions, disabled } = this.props;
        const Icon = icon;
        const label = actions === 0 ? 'No notifications' : `You have ${actions} notifications`;
        return (
            <div className={cx(className, styles.ActionButtonContainer)} >
                {actions > 0 && <div className={styles.ActionButtonCount}>
                    {actions}
                </div>}
                <button aria-label={label} type="button" disabled={disabled} className={styles.ActionButton} onClick={(ev) => onClick(ev)}>
                    {this.props.text}
                    {Icon ? <Icon /> : null}
                </button>
            </div>
        );
    }
}

export default ActionButton;
