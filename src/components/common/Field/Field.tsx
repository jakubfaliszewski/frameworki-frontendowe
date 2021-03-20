import React, { Component, RefObject } from 'react';

import cx from 'classnames';
import styles from "./Field.module.scss";

type S = {
    value: string | number | undefined
}

type P = {
    customClass: string,
    placeholder: string,
    required: boolean,
    label: string | undefined,
    type: 'string' | 'number' | 'email' | 'dropdown' | 'date' | 'file',
    value: string | number | undefined,
    values?: string[],
    onChange: Function
}

class Field extends Component<P, S> {
    static defaultProps = {
        required: false,
        customClass: null,
        placeholder: null,
        values: [],
        onChange: () => null
    }

    input: RefObject<HTMLInputElement> = React.createRef();

    constructor(props: P) {
        super(props);
        this.state = {
            value: props.value
        }

        this.onChange = this.onChange.bind(this);
    }

    onSelectChange(ev: React.ChangeEvent<HTMLSelectElement>) {
        if (ev.target.value !== null) {
            this.setState({
                value: ev.target.value
            }, () => {
                if (this.props.onChange) {
                    this.props.onChange({
                        value: ev.target.value
                    });
                }
            })
        }
    }

    onChange(ev: React.ChangeEvent<HTMLInputElement>) {
        if (ev.target.value !== null) {
            const value = ev.target.value;
            this.setState({
                value: value
            }, () => {
                if (this.props.onChange) {
                    this.props.onChange({
                        value: value,
                        valid: this.input.current?.checkValidity()
                    });
                }
            })
        }
    }

    render() {
        const { label, type, placeholder, customClass, required, values } = this.props;
        let dropdownValues;
        if(values) {
            dropdownValues = values.map((v, i) => <option key={`option_${i}`} value={v}>{v}</option>);
        }

        return (
            <div className={cx(styles.Field, customClass)}>
                {type === 'dropdown'
                    ? <select value={this.state.value} onChange={(ev) => this.onSelectChange(ev)}>{dropdownValues}</select>
                    : <input ref={this.input} required={required} type={type} value={this.state.value} placeholder={label || placeholder} onChange={(ev) => this.onChange(ev)} />}
            </div>
        );
    }
}

export default Field;
