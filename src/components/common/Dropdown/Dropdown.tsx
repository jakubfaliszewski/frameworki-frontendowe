import React, { Component, RefObject } from 'react';

import { MdArrowDropDown } from 'react-icons/md';
import cx from 'classnames';
import styles from "./Dropdown.module.scss";

export interface IDropdownItem {
    label: String | React.ReactNode,
    value: any
}

type S = {
    isListOpen: boolean
}

type P = {
    items: IDropdownItem[],
    onChange: Function,
    value?: IDropdownItem
    disabled?: boolean,
    className?: string
}

class Dropdown extends Component<P, S> {
    ripple: RefObject<HTMLSpanElement> = React.createRef();

    static defaultProps = {
        disabled: false,
        className: null,
    }

    constructor(props: P) {
        super(props);
        this.state = {
            isListOpen: false,
        }

        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
    }

    componentDidUpdate(prevProps: P) {
        const { isListOpen } = this.state;
        setTimeout(() => {
            if (isListOpen) {
                window.addEventListener('click', this.closeDropdown)
            }
            else {
                window.removeEventListener('click', this.closeDropdown)
            }
        }, 0)
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
        const newState = {
            isListOpen: !this.state.isListOpen
        }
        this.setState(newState);
    }

    onChange(value: any) {
        this.closeDropdown();
        this.props.onChange(value);
    }

    closeDropdown() {
        this.setState({
            isListOpen: false
        });
    }

    render() {
        const { className, disabled, items, value } = this.props;

        return (
            <div className={cx(styles.DropdownContainer, className)} >
                <button disabled={disabled} type="button" className={cx(styles.Dropdown, this.state.isListOpen ? styles.open : null)} onClick={(ev) => this.onClick(ev)}>
                    {value?.label} <MdArrowDropDown />
                    <span ref={this.ripple} className={styles.ripple}></span>
                </button>
                {this.state.isListOpen &&
                    <div className={styles.DropdownValues} >
                        {items.map((v, i) => <div key={`dropOpt_${i}`} className={styles.DropdownItem} onClick={() => this.onChange(v.value)}>
                            {v.label}
                        </div>)}
                    </div>
                }
            </div>
        );
    }
}

export { Dropdown };
