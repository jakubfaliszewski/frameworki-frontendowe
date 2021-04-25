import { IoAdd, IoClose } from 'react-icons/io5';
import React, { Component } from 'react';

import Button from './../../common/Button/Button';
import Field from './../../common/Field/Field';
import { IProfile } from '../../../utils/Rest';
import parentStyles from "./../Profile.module.scss";
import styles from "./Fees.module.scss";
import { v4 as uuid } from "uuid";

type _keys = 'id' | 'year' | 'costCenter' | 'totalAmount' | 'firm';

interface ITable {
    columnName: string | undefined;
    stateKey: _keys,
    type: 'string' | 'number'
}

type P = {
    data: IProfile['fees'],
    formActive: boolean
}

type S = {
    data: IProfile['fees']
}

class Fees extends Component<P, S> {

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
            year: 2020,
            costCenter: '',
            totalAmount: 0,
            firm: ''
        });
        this.setState({
            data: newState
        });
    }

    onInputChange(val: { value: string, valid?: boolean }, key: _keys, index: number) {
        this.setState((prevState) => {
            let newVal = prevState.data;
            newVal[index][key] = val.value as never;
            return {
                data: newVal
            }
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

        // sort by year
        rows = rows.sort((a, b) => Number(b[0]) - Number(a[0]));
        // remove reccurung years
        const newRows: (string | number)[][] = [];
        rows.forEach((v, parentI) => {
            const val = [...v];
            if (parentI > 0 && rows[parentI - 1][0] === v[0]) {
                val[0] = ' ';
            }
            // by they way, format currency
            val[2] = new Intl.NumberFormat('en-US', {
                style: 'currency',
                minimumFractionDigits: 0,
                currency: 'USD'
            }).format(val[2] as number);

            newRows.push(val);
        });

        return newRows.length > 0
            ? <table className={parentStyles.table}>
                <tbody>
                    <tr>
                        {headers.map((v, i) => <th key={`header${i}`}>{v}</th>)}
                    </tr>
                    {newRows.map((row, i) => <tr key={`tr_${i}`}>
                        {row.map((val, chI) => <td key={`td_${i}_${chI}`} className={!val ? parentStyles.empty : ''}>
                            {val || 'empty'}
                        </td>)}
                    </tr>)}
                </tbody>
            </table>
            : <p>No items</p>;
    }

    render() {
        const table: ITable[] = [{
            columnName: "Year",
            stateKey: 'year',
            type: "number"
        }, {
            columnName: "Cost center",
            stateKey: 'costCenter',
            type: "string"
        }, {
            columnName: "Total amount",
            stateKey: 'totalAmount',
            type: "number"
        }, {
            columnName: "Law firm",
            stateKey: 'firm',
            type: "string"
        }];

        return (
            <div className={styles.Reviews}>
                <h3 className="header-3">Amount of fees</h3>
                <div className={styles.ReviewsData}>
                    {this.createTable(this.props.formActive, table)}
                </div>
            </div>
        );
    }
}


export default Fees;
