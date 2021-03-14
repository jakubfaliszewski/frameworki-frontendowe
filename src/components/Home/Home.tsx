import React, { Component } from 'react';

import Publications from './Publications/Publications';
import styles from "./Home.module.scss";

class Home extends Component {

    render() {
        return (
            <div className={styles.Home}>
                <Publications/>
            </div>
        );
    }
}

export default Home;