import React, { Component } from 'react';

import Button from '../Button/Button';
import { IconType } from 'react-icons';
import cx from 'classnames';
import styles from "./Switcher.module.scss";

export interface ISwitcherOption {
    label: string,
    icon: IconType,
    value: boolean
}

type P = {
    value: boolean,
    onChange: Function,
    options: ISwitcherOption[]
}

class Switcher extends Component<P, {}> {
    static defaultProps = {
        value: false,
    }

    render() {
        const { options, value, onChange } = this.props;

        return (
            <div className={styles.Switcher} >
                {options.map((option, i) => <Button
                    key={`switcher_${i}`}
                    aria-label={option.label}
                    icon={option.icon}
                    label={option.label}
                    className={cx(styles.SwitcherButton, option.value === value ? styles.active : null)}
                    onClick={() => onChange(option.value)}>
                </Button>)}
            </div>
        );
    }
}

export { Switcher };
