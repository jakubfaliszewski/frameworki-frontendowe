import React, { Component } from 'react';
import { formatDate, getRandomDate } from '../../../utils/dateUtils';

import { IComment } from './../../../utils/Rest';
import cx from 'classnames';
import styles from "./Pagination.module.scss";

type P = {
    pageSize: number,
    itemsCount: number,
    currentPage: number,
    onChange: Function
}

class Pagination extends Component<P, {}> {

    randomDate = formatDate(getRandomDate());

    constructor(props: P) {
        super(props)
    }

    static defaultProps = {
        onChange: null
    }

    getButton(index: number) {
        return <button key={`pagin_${index}`}
            disabled={this.props.currentPage === index}
            className={cx(styles.PaginationButton, styles.PaginationButtonNumeric)}
            onClick={() => this.props.onChange(index)}>
            {index + 1}
        </button>;
    }

    getLayoutType(pageCount: number) {
        let countArr = new Array(pageCount).fill(0);
        countArr = countArr.map((v, i) => i);
        if (pageCount <= 6) {
            return countArr.map((v, i) =>
                this.getButton(v)
            );
        } else {
            return <>
                {this.getButton(0)}
                {this.props.currentPage > 1 && '...'}
                {[...countArr].slice(this.props.currentPage, this.props.currentPage + 3).map((v, i) =>
                    ((v !== 0 && v < pageCount - 1) && this.getButton(v))
                )}
                {pageCount - 5 >= this.props.currentPage && '...'}
                {[...countArr].slice(pageCount - 1).map((v, i) =>
                    (v !== pageCount && this.getButton(v))
                )}
            </>;
        }
    }

    render() {
        const { itemsCount, pageSize, currentPage, onChange } = this.props;
        const pageCount = Math.ceil(itemsCount / pageSize);

        return (
            <div className={styles.Pagination}>
                <button disabled={currentPage === 0} className={styles.PaginationButton} onClick={() => onChange(currentPage - 1)}>Previous</button>
                {this.getLayoutType(pageCount)}
                <button disabled={pageCount - 1 === currentPage} className={styles.PaginationButton} onClick={() => onChange(currentPage + 1)}>Next</button>
            </div>
        );
    }
}

export default Pagination;
