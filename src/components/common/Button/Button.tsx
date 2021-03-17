import React, { Component, RefObject } from 'react';

import { IconType } from 'react-icons';
import cx from 'classnames';
import styles from "./Button.module.scss";

type P = {
    label: string,
    onClick: Function,
    icon: IconType,
    iconOnly: boolean,
    disabled: boolean,
    border: boolean,
    className: string
}

class Button extends Component<P, {}> {
    ripple: RefObject<HTMLSpanElement> = React.createRef();

    static defaultProps = {
        label: null,
        icon: null,
        iconOnly: false,
        className: null,
        disabled: false,
        border: false,
        onClick: () => null
    }

    onClick(ev: React.MouseEvent) {
        const button = ev.currentTarget as HTMLButtonElement;
        const ripple = this.ripple.current;
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        if (ripple) {
            ripple.style.width = ripple.style.height = `${diameter}px`;
            ripple.style.left = `${ev.clientX - button.offsetLeft - radius}px`;
            ripple.style.top = `${ev.clientY - button.offsetTop - radius}px`;
            ripple.className = styles.ripple;
            button.appendChild(ripple);
        }

        this.props.onClick(ev);
    }

    render() {
        const { label, icon, iconOnly, className, disabled, border } = this.props;
        const Icon = icon;
        
        return (
            <div className={cx(styles.ButtonContainer, className)} >
                <button disabled={disabled} aria-label={label} type="button" className={cx(styles.Button, iconOnly ? styles.ButtonIcon : null, border ? styles.ButtonBorder : null)} onClick={(ev) => this.onClick(ev)}>
                    {Icon ? <Icon /> : null}
                    {label}
                    <span ref={this.ripple} className={styles.ripple}></span>
                </button>
            </div>
        );
    }
}

export default Button;
