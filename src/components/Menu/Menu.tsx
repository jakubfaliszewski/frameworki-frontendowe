import React, { Component } from 'react';

import { FullscreenState } from '../../reducers/FullscreenReducer';
import { IStore } from '../../store';
import UserCard from "./UserCard/UserCard";
import { connect } from 'react-redux';
import cx from "classnames";
import styles from "./Menu.module.scss";

type P = FullscreenState;

class Menu extends Component<P> {
    render() {
        return (
            <aside className={cx(styles.Menu, this.props.isFullscreen ? styles.MenuHidden : null)} >
                <UserCard />
            </aside>
        );
    }
}

const mapStateToProps = (state: IStore) => ({
    isFullscreen: state.FullscreenReducer.isFullscreen
});

export default connect(mapStateToProps)(Menu);
