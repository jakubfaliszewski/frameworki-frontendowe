import React, { Component } from 'react';
import { formatDate, getRandomDate } from '../../../utils/dateUtils';

import { IComment } from './../../../utils/Rest';
import UserSignature from './..//UserSignature/UserSignature';
import cx from 'classnames';
import styles from "./WorkTile.module.scss";

type P = {
    work: IComment,
}

class WorkTile extends Component<P, {}> {

    randomDate = formatDate(getRandomDate());

    render() {
        const { work } = this.props;

        return (
            <div className={styles.WorkTile}>
                <div>
                    <h3 className={cx(styles.WorkTileName, 'header-3 firstLetterUpper')}>{work.name}</h3>
                    <p className={styles.WorkTileBody} >{work.body}</p>
                    {work?.post && <UserSignature type="company" onWhiteBg userId={work.post.userId}/>}
                </div>
            </div>
        );
    }
}

export default WorkTile;
