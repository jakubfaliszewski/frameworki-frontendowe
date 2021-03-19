import React, { Component } from 'react';

import DropdownMenu from './DropdownMenu/DropdownMenu';
import { FullscreenState } from '../../reducers/FullscreenReducer';
import { IStore } from '../../store';
import { Link } from "react-router-dom";
import NavbarActions from './NavbarActions/NavbarActions';
import Search from '../common/Search/Search';
import { connect } from 'react-redux';
import cx from "classnames";
import logo from './../../assets/react-logo.png';
import styles from "./Navbar.module.scss";

type P = FullscreenState;

class Navbar extends Component<P> {
    render() {
        return (
            <header className={cx(styles.Navbar, this.props.isFullscreen ? styles.NavbarHidden : null)} >
                <div className={styles.NavbarMenu}>
                    <Link to="/" className={styles.NavbarLogo}><img src={logo} alt="Website logo" /></Link>
                    <DropdownMenu />
                </div>
                <Search customClass={styles.searchBar} placeholder="Search Legalcluster" />
                <NavbarActions />
            </header>
        );
    }
}

const mapStateToProps = (state: IStore) => ({
    isFullscreen: state.FullscreenReducer.isFullscreen
});

export default connect(mapStateToProps)(Navbar);
