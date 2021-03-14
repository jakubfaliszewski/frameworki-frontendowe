import React, { Component } from 'react';

import Publications from './Publications/Publications';
import Work from '../Work/Work';
import styles from "./Home.module.scss";

class Home extends Component {

    render() {
        return (
            <div className={styles.Home}>
                <Publications/>
                <Work/>
            </div>
        );
    }
}

export default Home;