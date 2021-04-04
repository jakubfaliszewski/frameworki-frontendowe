import React, { Component, RefObject } from 'react';

import { IconType } from 'react-icons';
import { LightenDarkenColor } from '../../../utils/colorUtils';
import cx from 'classnames';
import styles from "./Button.module.scss";

type P = {
    label: string,
    onClick: Function,
    icon: IconType,
    iconOnly: boolean,
    disabled: boolean,
    border: boolean,
    className: string,
    theme?: string
}

class Button extends Component<P, {}> {
    ripple: RefObject<HTMLSpanElement> = React.createRef();

    static defaultProps: P = {
        label: null,
        icon: null,
        iconOnly: false,
        className: null,
        disabled: false,
        border: false,
        onClick: () => null as Function
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
        const { label, icon, iconOnly, className, disabled, border, theme } = this.props;
        const Icon = icon;
        let colors = {
            backgroundColor: '',
            color: '',
            borderColor: ''
        };
        if (theme) {
            colors = {
                backgroundColor: theme,
                color: LightenDarkenColor(theme, -90),
                borderColor: border ? LightenDarkenColor(theme, -90) : ''
            }    
        }

        return (
            <div className={cx(styles.ButtonContainer, className)} >
                <button style={colors} disabled={disabled} aria-label={label} type="button" className={cx(styles.Button, iconOnly ? styles.ButtonIcon : null, border ? styles.ButtonBorder : null)} onClick={(ev) => this.onClick(ev)}>
                    {Icon ? <Icon style={{color: colors.color}} /> : null}
                    {label && <p style={{color: colors.color}}>{label}</p>}
                    <span ref={this.ripple} className={styles.ripple}></span>
                </button>
            </div>
        );
    }
}

export default Button;
