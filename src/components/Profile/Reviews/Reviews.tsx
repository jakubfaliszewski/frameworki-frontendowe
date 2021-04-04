import { IoAdd, IoClose } from 'react-icons/io5';
import React, { Component } from 'react';

import Button from './../../common/Button/Button';
import Field from './../../common/Field/Field';
import { IProfile } from '../../../utils/Rest';
import parentStyles from "./../Profile.module.scss";
import styles from "./Reviews.module.scss";
import { v4 as uuid } from "uuid";

type _keys = 'id' | 'name' | 'entity' | 'location' | 'expertise' | 'date';

interface ITable {
    columnName: string | undefined;
    stateKey: _keys,
    type: 'string' | 'date'
}

type P = {
    data: IProfile['reviews'],
    formActive: boolean
}

type S = {
    data: IProfile['reviews']
    expand: boolean
}

class Reviews extends Component<P, S> {

    constructor(props: P) {
        super(props);
        this.state = {
            data: props.data,
            expand: false
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

    removeRow(index: number) {
        let newState = this.props.data;
        newState.splice(index, 1);
        this.setState({
            data: newState
        });
    }

    addRow() {
        const newState = this.props.data;
        newState.push({
            id: uuid(),
            name: '',
            entity: '',
            location: '',
            expertise: '',
            date: ''
        });
        this.setState({
            data: newState
        });
    }

    onInputChange(val: { value: string, valid?: boolean }, key: _keys, index: number) {
        let newVal = [...this.state.data];
        newVal[index][key] = val.value;
        this.setState({
            data: newVal
        });
    }

    createTable(active: boolean, tab: ITable[]) {
        const headers = tab.map((v) => v.columnName);
        let rows = [...this.state.data].map((v) => tab.map(x => v[x.stateKey]));

        if (active) {
            return <>
                <table className={parentStyles.table}>
                    <tbody>
                        <tr>
                            {headers.map((v, i) => <th key={i}>{v}</th>)}
                            <th></th>
                        </tr>
                        {rows.map((row, parentIndex) => <tr key={parentIndex}>
                            {row.map((val, i) =>
                                <td key={i}>
                                    <Field key={`item_${this.state.data[parentIndex].id}`} label={headers[i]} type={tab[i].type} value={val} onChange={(e: { value: string, valid: boolean }) => this.onInputChange(e, tab[i].stateKey, parentIndex)} />
                                </td>
                            )}
                            <td> <Button iconOnly icon={IoClose} onClick={() => this.removeRow(parentIndex)} /></td>
                        </tr>)}
                    </tbody>
                </table>
                <Button label="Add new row" icon={IoAdd} onClick={() => this.addRow()} />
            </>;
        }

        if (!this.state.expand) {
            rows = rows.slice(0, 3);
        }

        return rows.length > 0
            ? <table className={parentStyles.table}>
                <tbody>
                    <tr>
                        {headers.map((v, i) => <th key={`header${i}`}>{v}</th>)}
                    </tr>
                    {rows.map((row, i) => <tr key={`tr_${i}`}>
                        {row.map((val, chI) => <td key={`td_${i}_${chI}`} className={!val ? parentStyles.empty : ''}>{val || 'empty'}</td>)}
                    </tr>)}
                </tbody>
            </table>
            : <p>No items</p>;
    }

    getExpandBtn() {
        const expandAction = !this.state.expand;
        const label = this.state.expand ? "See less" : "See more proposals";
        return (!this.props.formActive && this.state.data.length > 3) && <Button label={label} onClick={() => {
            this.setState({
                expand: expandAction
            })
        }} />
    }

    render() {
        const table: ITable[] = [{
            columnName: "Expertise",
            stateKey: 'name',
            type: "string"
        }, {
            columnName: "Entity",
            stateKey: 'entity',
            type: "string"
        }, {
            columnName: "Location",
            stateKey: 'location',
            type: "string"
        }, {
            columnName: "Expertise",
            stateKey: 'expertise',
            type: "string"
        }, {
            columnName: "Date",
            stateKey: 'date',
            type: "date"
        }];

        return (
            <div className={styles.Reviews}>
                <h3 className="header-3">Interal reviews</h3>
                <div className={styles.ReviewsData}>
                    {this.createTable(this.props.formActive, table)}
                    {this.getExpandBtn()}
                </div>
            </div>
        );
    }
}


export default Reviews;
