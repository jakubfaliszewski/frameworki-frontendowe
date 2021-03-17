import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Button from '../common/Button/Button';
import styles from "./NotFound.module.scss";

type P = RouteComponentProps;

class NotFound extends Component<P> {

    goHome() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className={styles.NotFound}>
                <span className={styles.BgText}>404</span>
                <p>This is a mock page</p>
                <p>Go away</p>
                <Button label="Go back home" onClick={() => this.goHome()}/>
            </div>
        );
    }
}

export default withRouter(NotFound);