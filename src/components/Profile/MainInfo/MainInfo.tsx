import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import { NotificationActions, NotificationReducer } from '../../../reducers/NotificationReducer';
import React, { Component } from 'react';
import { RiBriefcase4Line, RiNewspaperLine } from "react-icons/ri";
import { VscClose, VscEdit, VscSave } from "react-icons/vsc";

import Button from './../../common/Button/Button';
import Field from './../../common/Field/Field';
import { IUserLocal } from './../../../utils/Rest';
import Img from './../../common/Img/Img';
import RestService from './../../../utils/RestService';
import { connect } from 'react-redux';
import parentStyles from "./../Profile.module.scss";
import { set } from 'lodash';
import styles from "./MainInfo.module.scss";

interface IField {
    label: string | undefined;
    stateKey: string,
    type: 'string' | 'number' | 'email' | 'dropdown';
    value: string | number | undefined;
    values?: string[]
}

type P = {
    profile: IUserLocal,
    changeState: Function,
    dispatch: Dispatch<AnyAction>
}

type S = {
    profile: IUserLocal,
    profileBasicEditMode: boolean,
}

class MainInfo extends Component<P, S> {
    service = new RestService();
    validTemp: any = {};

    constructor(props: P) {
        super(props);
        this.state = {
            profile: { ...props.profile },
            profileBasicEditMode: false
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.editBasics = this.editBasics.bind(this);
        this.saveBasics = this.saveBasics.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    componentDidUpdate() {
        if(this.state.profile.id !== this.props.profile.id) {
            this.setState({
                profile: this.props.profile
            })
        }
    }

    editBasics() {
        this.setState({
            profileBasicEditMode: true
        })
    }

    saveBasics() {
        const userId = this.props.profile.id;
        this.setState({
            profileBasicEditMode: false
        }, () => {
            if (this.state.profile) {
                this.props.dispatch({type: NotificationActions.ADD, payload: {
                    title:`Profile of ${this.state.profile.name} was updated`,
                    user: this.state.profile
                }});
                this.service.setUserProfile(userId, this.state.profile);
                this.props.changeState({ profile: this.state.profile });
                this.validTemp = {};
            }
        })
    }

    cancelEdit() {
        this.setState({
            profileBasicEditMode: false,
            profile: { ...this.props.profile }
        });
        this.validTemp = {};
    }

    onInputChange(val: { value: string, valid?: boolean }, key: string) {
        const newKeys = key.split('.');
        let newVal = { ...this.state };
        if (val.valid !== undefined) {
            this.validTemp[`valid_${key}`] = val.valid;
        }
        set(newVal, newKeys, val.value);
        this.setState(newVal);
    }

    createForm(active: boolean, fields: IField[]) {
        if (active) {
            return <form>{fields.map((field, i) =>
                <Field key={`${field}_${i}`} required customClass={styles.Input} label={field.label} type={field.type} values={field.values} value={field.value} onChange={(e: { value: string, valid: boolean }) => this.onInputChange(e, field.stateKey)} />
            )}</form>
        }

        return fields.map((field, i) => <p key={`staticField_${i}`} >{field.value}</p>)
    }

    render() {
        const profile = this.state.profile;

        const basic1: IField[] = [{
            label: "Name",
            type: 'string',
            stateKey: 'profile.name',
            value: profile?.name
        }, {
            label: "Company",
            type: 'string',
            stateKey: 'profile.company.name',
            value: profile?.company.name
        }, {
            label: "City",
            type: 'string',
            stateKey: 'profile.address.city',
            value: profile?.address.city
        }, {
            label: "Role",
            type: 'dropdown',
            stateKey: "profile.partner",
            values: ['Partner', 'Contractor'],
            value: profile?.partner || 'Partner'
        }];

        const basic2: IField[] = [{
            label: "Email",
            type: 'email',
            stateKey: 'profile.email',
            value: profile?.email
        }, {
            label: "Phone number",
            type: 'string',
            stateKey: 'profile.phone',
            value: profile?.phone
        }];

        const isSomeInvalid = Object.values(this.validTemp).some(v => v === false);

        return (
            <div className={styles.MainInfo}>
                <div className={parentStyles.editHeader}>
                    {this.state.profileBasicEditMode
                        ? <>
                            <Button iconOnly className={parentStyles.editButton} disabled={isSomeInvalid} icon={VscSave} onClick={() => this.saveBasics()} />
                            <Button iconOnly className={parentStyles.editButton} icon={VscClose} onClick={this.cancelEdit} />
                        </>
                        : <Button iconOnly className={parentStyles.editButton} icon={VscEdit} onClick={this.editBasics} />}
                </div>
                <div className={styles.MainInfoPhoto}>
                    <div className={styles.MainInfoPhotoCont}>
                        <Img src={profile?.photo?.url} alt={profile?.photo?.title} />
                        <div className={styles.Badge}>
                            {profile?.partner === "Contractor"
                                ? <RiNewspaperLine />
                                : <RiBriefcase4Line />}
                        </div>
                    </div>
                    <Button className={styles.SeeProfile} label={"See profile"} />
                </div>
                <div className={styles.MainInfoData}>
                    {this.createForm(this.state.profileBasicEditMode, basic1)}
                </div>
                <div className={styles.MainInfoData}>
                    {this.createForm(this.state.profileBasicEditMode, basic2)}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return bindActionCreators({
        ...NotificationReducer
    }, dispatch);
};

export default connect(mapDispatchToProps)(MainInfo);
