import { IoAdd, IoClose } from 'react-icons/io5';
import React, { Component } from 'react';

import { BiMessage } from 'react-icons/bi';
import Button from '../../common/Button/Button';
import { FaUser } from 'react-icons/fa';
import Field from '../../common/Field/Field';
import { IProfile } from '../../../utils/Rest';
import styles from "./PanellInformations.module.scss";
import { v4 as uuid } from "uuid";

type _keys = 'hourlyFee' | 'terms' | 'correspondants';

type P = {
    data: IProfile['panelInformations'],
    formActive: boolean
}

type S = {
    data: IProfile['panelInformations']
}

class PanellInformations extends Component<P, S> {

    constructor(props: P) {
        super(props);
        this.state = {
            data: props.data
        }

        // this.onInputChange = this.onInputChange.bind(this);
    }

    componentDidUpdate(prevProps: P) {
        if (prevProps.formActive !== this.props.formActive) {
            this.setState({
                data: this.props.data
            })
        }
    }

    removeRow(index: number) {
        let newState = this.props.data;
        newState.correspondants.splice(index, 1);
        this.setState({
            data: newState
        });
    }

    addRow() {
        const newState = this.props.data;
        newState.correspondants.push({
            id: uuid(),
            value: ''
        });
        this.setState({
            data: newState
        });
    }

    onInputChange(val: { value: string, valid?: boolean }, key: _keys, index?: number) {
        let newVal = this.state.data;
        if (index) {
            (newVal[key][index] as any).value = val.value as any;
        } else {
            newVal[key] = val.value as any;
        }
        this.setState({
            data: newVal
        });
    }

    getHourlyFee(isActive: boolean) {
        const value = this.props.data.hourlyFee;
        return <div>
            <p className="header-4 ">Hourly fee</p>
            {isActive
                ? <Field label="Hourly fee" type="string" value={value} onChange={(val: { value: string, valid?: boolean }) => this.onInputChange(val, "hourlyFee")} />
                : <p className={styles.value}>{value || '- no info -'}</p>
            }
        </div>;
    }
    geTerms(isActive: boolean) {
        const value = this.props.data.terms;
        return <div>
            <p className="header-4 ">Terms & conditions</p>
            <p className="header-sub ">Monthly 10k€ retainer - see with Jeanny Smith</p>
            {isActive
                ? <Field customClass={styles.fileField} label="Terms file" type="file" value="" onChange={(val: { value: string, valid?: boolean }) => this.onInputChange(val, "terms")} />
                : <p className={styles.fileField}>{value || '- no info -'}</p>
            }
        </div>;
    }
    getSP() {
        return <div>
            <p className="header-5 ">Service & projects</p>
            <p className="header-sub ">Corporate M&A and international qcquisitions</p>
        </div>;
    }

    getCorrespondants(isActive: boolean) {
        const value = this.props.data.correspondants;
        const usersEdit = value.map((user, i) => {
            return <div className={styles.user} key={user.id}>
                <div>
                    <Field label="User name" type="string" value={user.value} onChange={(val: { value: string, valid?: boolean }) => this.onInputChange(val, "correspondants", i)} />
                    <Button disabled label="Message" icon={BiMessage} />
                    <Button disabled label="Profile" icon={FaUser} />
                </div>
                <Button iconOnly icon={IoClose} onClick={() => this.removeRow(i)} />
            </div>;
        });
        const users = value.map((user) => {
            return <div className={styles.user} key={user.id}>
                <div>
                    {user.value || '- no info -'}
                    <Button label="Message" icon={BiMessage} />
                    <Button label="Profile" icon={FaUser} />
                </div><span />
            </div>;
        });
        return <div>
            <p className="header-5 ">Internal correspondants</p>
            {isActive
                ? <>
                    {usersEdit}
                    <Button label="Add new row" icon={IoAdd} onClick={() => this.addRow()} />
                </>
                : users
            }
        </div>;
    }


    render() {
        return (
            <div className={styles.PanellInformations}>
                <h3 className="header-3">Panel informations</h3>
                <div className={styles.PanellInformationsData}>
                    {this.getHourlyFee(this.props.formActive)}
                    {this.geTerms(this.props.formActive)}
                    {this.getSP()}
                    {this.getCorrespondants(this.props.formActive)}
                </div>
            </div>
        );
    }
}


export default PanellInformations;
