import React, { Component } from 'react';

import { Link } from "react-router-dom";
import NavbarActions from './NavbarActions/NavbarActions';
import Search from '../common/Search/Search';
import logo from './../../assets/react-logo.png';
import styles from "./Navbar.module.scss";

class Navbar extends Component {

    render() {
        return (
            <header className={styles.Navbar}>
                <div className={styles.NavbarMenu}>
                    <Link to="/" className={styles.NavbarLogo}><img src={logo} alt="Website logo" /></Link>
                </div>
                <Search customClass={styles.searchBar} />
                <NavbarActions />
            </header>
        );
    }
}

export default Navbar;
