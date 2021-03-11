
import React, { Component, RefObject } from 'react';
import styles from "./Search.module.scss";
import cx from 'classnames';
import { ImSearch } from "react-icons/im";

type S = {
    value: string
}

type P = {
    customClass: string,
    onSearchClick: Function,
    onChange: Function
}

class Search extends Component<P, S> {
    static defaultProps = {
        customClass: null,
        onSearchClick: () => null,
        onChange: () => null
    }

    searchInput: RefObject<HTMLInputElement> = React.createRef();

    constructor(props: P) {
        super(props);
        this.state = {
            value: ''
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(ev: React.ChangeEvent<HTMLInputElement>) {
        if (ev.target.value !== null) {
            this.setState({
                value: ev.target.value
            }, () => {
                if (this.props.onChange) {
                    this.props.onChange(ev.target.value);
                }
            })
        }
    }

    render() {
        const searchHaveValue = this.state.value.length > 0;

        return (
            <div className={cx(styles.Search, this.props.customClass)}>
                <input ref={this.searchInput} type="text" value={this.state.value} placeholder={'Search Legalcluster'} onChange={(ev) => this.onChange(ev)} />
                <button type="button" className={cx(styles.SearchButton)} onClick={(ev) => this.props.onSearchClick(ev)}>
                    <ImSearch className={styles.SearchIcon} />
                </button>
            </div>
        );
    }
}

export default Search;
