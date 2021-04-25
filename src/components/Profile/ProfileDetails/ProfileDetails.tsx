import { IoAdd, IoClose } from 'react-icons/io5';
import React, { Component } from 'react';

import Button from './../../common/Button/Button';
import Field from './../../common/Field/Field';
import { IProfile } from '../../../utils/Rest';
import styles from "./ProfileDetails.module.scss";
import { v4 as uuid } from "uuid";

type _keys = 'expertise' | 'specialities' | 'admissions' | 'counties';

interface IField {
    label: string | undefined;
    stateKey: _keys,
    values: {
        id: string,
        value: string
    }[]
}

type P = {
    data: IProfile['details'],
    formActive: boolean
}

type S = {
    data: IProfile['details']
}

class ProfileDetails extends Component<P, S> {
    constructor(props: P) {
        super(props);
        this.state = {
            data: props.data
        }

        this.onInputChange = this.onInputChange.bind(this);
    }

    componentDidUpdate(prevProps: P) {
        if (prevProps.formActive !== this.props.formActive) {
            this.setState({
                data: this.props.data
            })
        }
    }


    removeItem(key: _keys, id: string) {
        this.setState((prevState) => {
            const newState = prevState.data;
            newState[key] = newState[key].filter((item) => id !== item.id);
            return {
                data: newState
            }
        });
    }

    addItem(key: _keys) {
        this.setState((prevState) => {
            const newState = prevState.data;
            newState[key].push({
                id: uuid(),
                value: ''
            });
            return {
                data: newState
            }
        });
    }

    onInputChange(val: { value: string, valid?: boolean }, key: _keys, index: number) {
        this.setState((prevState) => {
            let newVal = prevState.data;
            newVal[key][index].value = val.value;
            return {
                data: newVal
            }
        });
    }

    createForm(active: boolean, fields: IField[]) {
        if (active) {
            return fields.map((field, index) => <div key={field.stateKey}>
                <p className="header-4">{field.label}</p>
                <form className={styles.ProfileDetailsItems} key={`form_${field.stateKey}_${index}`} >
                    <>
                        {field.values.map((item, i) => <div className={styles.ProfileDetailsItem} key={item.id}>
                            <Field key={`field_${field.stateKey}_${item.id}`} label={field.label} type="string" value={item.value} onChange={(e: { value: string, valid: boolean }) => this.onInputChange(e, field.stateKey, i)} />
                            <button type="button" onClick={() => this.removeItem(field.stateKey, item.id)}><IoClose /></button>
                        </div>)}
                        <Button icon={IoAdd} iconOnly onClick={() => this.addItem(field.stateKey)} />
                    </>
                </form>
            </div>)
        }

        return fields.map((field, i) => <div key={field.stateKey}>
            <p className="header-4" key={`staticField_${i}`} >{field.label}</p>
            <div className={styles.ProfileDetailsItems} key={`staticVals_${i}`}>
                {field.values.length > 0
                    ? field.values.map((item) => item && <p key={`staticField_${i}_${item.id}`}>{item.value}</p>)
                    : <p className={styles.empty}>No items</p>}
            </div>
        </div>)
    }

    render() {
        const data = { ...this.state.data };

        const fields: IField[] = [{
            label: "Expertise",
            stateKey: 'expertise',
            values: data.expertise
        }, {
            label: "Specialities",
            stateKey: 'specialities',
            values: data.specialities
        }, {
            label: "Admissions to practice law",
            stateKey: 'admissions',
            values: data.admissions
        }, {
            label: "Counties",
            stateKey: "counties",
            values: data.counties
        }];

        return (
            <div className={styles.ProfileDetails}>
                <div className={styles.ProfileDetailsData}>
                    {this.createForm(this.props.formActive, fields)}
                </div>
            </div>
        );
    }
}

export default ProfileDetails;