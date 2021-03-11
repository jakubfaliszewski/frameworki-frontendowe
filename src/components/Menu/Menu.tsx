import React, { Component } from 'react';

import UserCard from "./UserCard/UserCard";
import styles from "./Menu.module.scss";

class Menu extends Component {

    render() {
        return (
            <aside className={styles.Menu}>
                <UserCard/>
            </aside>
        );
    }
}

export default Menu;